import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Step } from "../../components/Step";
import { Text } from "../../components/Text";
import { Title } from "../../components/Title";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import * as S from "./style";
import { Button } from "../../components/Button/style";
import { useFormAction, useNavigate } from "react-router-dom";
import { CheckBox } from "../../components/ChechBox";
import { InputFormated } from "../../components/InputFormated";
import { ContainerScreen } from "../../components/ContainerScreen";
import fetchAxios from "../../services/axios";
import { URL_CONSTANTS, URL_HEADERS } from "../../constants/urlConstants";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

interface PartnerDataType {
  cpf?: string,
  name?: string
}

interface BankType {
  bankNumber: number,
  bankName: string
}

interface SendDataType {
  bankNumber: string,
  agency: string,
  agencyDigit: string,
  accountNumber: string,
  accountDigit: string,
  accountType: string,
  jointAccount: boolean,
  partnerData?: PartnerDataType
}

export const bankersInfoSchema = z.object({
  account: z.string({ required_error: 'Digite o número sua conta' }).min(8, { message: 'Digite o número sua conta' }),
  agency: z.string({ required_error: 'Digite o número de sua agência' }).min(4, { message: 'Digite o número de sua agência' }),
  cpf: z.string({ required_error: 'Digite o nome do co-titular' }).trim().optional(),
  dig: z.string({ required_error: 'Digite o dígito da agência' }).min(4, { message: 'Digite o dígito' }),
  cotitu: z.string().optional(),
  checkboxField: z.boolean(),
  bank: z.string({ required_error: 'Selecione o banco' }).min(1, { message: 'Selecione o banco' }),
  typeAccount: z.string({ required_error: 'Selecione o tipo da conta' }).min(1, { message: 'Selecione o tipo da conta' }),
}).superRefine((data, ctx) => {
  if (data.checkboxField) {
    if (!data.cpf || data.cpf.trim().length === 0) {
      ctx.addIssue({
        path: ['cpf'],
        message: 'Digite o seu CPF',
        code: 'custom' // Incluindo o código de erro necessário
      });
    }
    if (!data.cotitu || data.cotitu.trim().length === 0) {
      ctx.addIssue({
        path: ['cotitu'],
        message: 'Digite o nome do co-titular',
        code: 'custom' // Incluindo o código de erro necessário
      });
    }
  }
});

type FormData = z.infer<typeof bankersInfoSchema>;

export const Bankers = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
    trigger,
    getValues,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(bankersInfoSchema),
    defaultValues: {
      checkboxField: false,
    },
  });

  const check = getValues("checkboxField");

  const [banks, setBanks] = useState([]);
  const [types, setTypes] = useState([]);

  const [allBanks, setAllBanks] = useState<BankType[]>((banks));

  const breakpointSmall = window.matchMedia("(max-width: 500px)");

  const getBanks = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/banks`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data);
        setAllBanks(response.data.data);
        const bankies = response.data.data.map((item: { bankName: any, bankNumber: any }) => `${item.bankNumber} - ${item.bankName}`);
        setBanks(bankies);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  const getBankType = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/bank-account-types`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data);
        const typies = response.data.data;
        setTypes(typies);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  useEffect(() => {
    getBanks();
    getBankType();
  }, []);

  const handleRequest = (data: FormData) => {
    const splitted = (data.bank.split(' - '));
    console.log(data.bank)
    const selectedBank = (allBanks ?? []).find((item: any) => item.bankName === splitted[1]);
    if (check) {
      const selectedData: SendDataType = {
        bankNumber: selectedBank ? String(selectedBank?.bankNumber) : '',
        agency: data.agency,
        agencyDigit: data.dig,
        accountNumber: data.account,
        accountDigit: data.dig,
        accountType: data.typeAccount,
        jointAccount: true,
        partnerData: {
          cpf: data.cpf,
          name: data.cotitu
        }
      }
      sendDataRequest(selectedData)
      return;
    } else {
      const selectedData: SendDataType = {
        bankNumber: selectedBank ? String(selectedBank?.bankNumber) : '',
        agency: data.agency,
        agencyDigit: data.dig,
        accountNumber: data.account,
        accountDigit: data.dig,
        accountType: data.typeAccount,
        jointAccount: false,
      }
      sendDataRequest(selectedData)
      return;
    }
  }

  const sendDataRequest = (data: SendDataType) => {

    fetchAxios.post('http://www.portal-register.web-dev.futuraonline.com.br/api/register/bank-account/1/1', data,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log('Resposta da API:', response.data);
        navigate("/patrimony")
      })
      .catch(error => {
        console.error('Erro ao fazer a solicitação:', error);
      });
  }

  return (
    <ContainerScreen>
      <S.GeneralContainer>
        <S.LeftContainer>
          <Title
            fs={40}
            fw={600}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="Dados bancários"
          />
          <Text
            fs={20}
            fw={400}
            color={NEUTRAL_COLORS.DARK}
            mt={22}
            value="Declare a conta corrente de sua titularidade para transferências de valor de entrada e saída de recursos."
          />
          <Controller
            name="bank"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                inputProps={{
                  options: banks,
                  onChange: onChange,
                  border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                  br: 6,
                  value: value,
                  color: NEUTRAL_COLORS.DARK,
                  fw: 400,
                  errorMessage: errors.bank?.message,
                  onBlur: () => trigger('bank')
                }}
                containerProps={{
                  mt: 8,
                }}
                labelProps={{
                  value: "Banco",
                  fs: 12,
                  fw: 400,
                  color: NEUTRAL_COLORS.DARK,
                }}
              />
            )
            }
          />
          <S.LineRadio>
          <Controller
              name="agency"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFormated
                  inputProps={{
                    mask: "0000",
                    ph: "",
                    value: value,
                    onChange: onChange,
                    errorMessage: errors.agency?.message,
                    onBlur: () => trigger('agency')

                                  
                  }}
                  containerProps={{}}
                  labelProps={{
                    value: "Agência",
                    color: NEUTRAL_COLORS.DARK,
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />
            <Controller
              name="dig"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFormated
                  inputProps={{
                    mask: "0000",
                    ph: "",
                    value: value,
                    onChange: onChange,
                    errorMessage: errors.dig?.message   ,
                    onBlur: () => trigger('dig')

                  }}
                  containerProps={{}}
                  labelProps={{
                    value: "Dígito",
                    color: NEUTRAL_COLORS.DARK,
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />


          </S.LineRadio>
          <S.LineRadio>
            <Controller
              name="typeAccount"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  inputProps={{
                    options: types,
                    onChange: onChange,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    br: 6,
                    value: value,
                    color: NEUTRAL_COLORS.DARK,
                    fw: 400,
                    errorMessage: errors.typeAccount?.message,
                    onBlur: () => trigger('typeAccount')
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                    value: "Tipo da conta",
                    fs: 12,
                    fw: 400,
                    color: NEUTRAL_COLORS.DARK,
                  }}
                />
              )
              }
            />
            <Controller
              name="account"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFormated
                  inputProps={{
                    mask: "00000000",
                    ph: "",
                    value: value,
                    onChange: onChange,
                    errorMessage: errors.account?.message   ,
                    onBlur: () => trigger('account')

                  }}
                  containerProps={{}}
                  labelProps={{
                    value: "Conta",
                    color: NEUTRAL_COLORS.DARK,
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />

          </S.LineRadio>
          <S.LineRadio style={{ marginTop: "18px" }}>
            <Controller
              name="checkboxField"
              control={control}
              render={({ field: { onChange, value, ref }, }) => (
                <CheckBox ref={ref} checked={value} onChange={onChange} />
              )
              }
            />
            <Text fs={12} fw={400} mr={24} value="Conta conjunta?" />
          </S.LineRadio>
          {watch('checkboxField') === true && (
            <S.LineRadio className="document">
              <Controller
                name="cotitu"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    inputProps={{
                      br: 6,
                      border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                      value: value,
                      onChange: onChange,
                      onBlur: () => trigger('cotitu'),
                      errorMessage: errors.cotitu?.message,
                    }}
                    containerProps={{
                      width: breakpointSmall.matches ? '100%' : "130%",
                    }}
                    labelProps={{
                      value: "Nome do co-titular",
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
                }
              />
              <Controller
                name="cpf"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputFormated
                    inputProps={{
                      mask: "000.000.000-00",
                      ph: "123.456.789-00",
                      value: value,
                      onChange: onChange,
                      onBlur: () => trigger('cpf'),
                      errorMessage: errors.cpf?.message,
                    }}
                    containerProps={{}}
                    labelProps={{
                      value: "CPF do co-titular",
                      color: NEUTRAL_COLORS.DARK,
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
                }
              />

            </S.LineRadio>
          )}
          <S.ButtonLine>
            <Button
              onClick={() => navigate("/residential")}
              values={{
                fs: 15,
                fw: 600,
                color: PRIMARY_COLORS.CORAL,
                border: `2px solid ${PRIMARY_COLORS.CORAL}`,
                width: 170,
              }}
            >
              Voltar
            </Button>
            <Button
              onClick={handleSubmit(handleRequest)}
              values={{
                fs: 15,
                fw: 600,
                color: NEUTRAL_COLORS.WHITE,
                border: `2px solid ${PRIMARY_COLORS.NIGHT_BLUE}`,
                bgc: `${PRIMARY_COLORS.NIGHT_BLUE}`,
                width: 170,
              }}
            >
              Continuar
            </Button>
          </S.ButtonLine>
        </S.LeftContainer>
        <S.RightContainer>
          <Step step={3} />
          <S.CardContainer>
            <Text
              fs={25}
              fw={700}
              color={NEUTRAL_COLORS.WHITE}
              value="Por que pedimos seus"
            />
            <Text
              fs={25}
              fw={700}
              mt={4}
              color={"#AACBDE"}
              value="dados bancários?"
            />
            <Text
              fs={16}
              fw={500}
              mt={16}
              color={NEUTRAL_COLORS.WHITE}
              value="Ao fornecer suas informações bancárias, podemos verificar a titularidade da conta e confirmar sua identidade, evitando fraudes e protegendo seus investimentos."
            />
          </S.CardContainer>
        </S.RightContainer>
      </S.GeneralContainer>
    </ContainerScreen>
  );
};
