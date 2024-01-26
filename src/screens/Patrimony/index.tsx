import { useRef, useState } from "react";
import { Step } from "../../components/Step";
import { Text } from "../../components/Text";
import { Title } from "../../components/Title";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import * as S from "./style";
import { Button } from "../../components/Button/style";
import { useNavigate } from "react-router-dom";
import { CheckBox } from "../../components/ChechBox";
import { InputCurrency } from "../../components/InputCurrency";
import { ContainerScreen } from "../../components/ContainerScreen";
import fetchAxios from "../../services/axios";
import { URL_HEADERS } from "../../constants/urlConstants";
import { Input } from "../../components/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "../../components/ErrorMessage";
import { Modal } from "../../components/Modal";

interface OriginType {
  professionalOrigin: boolean,
  heritageOrigin: boolean,
  donationOrigin: boolean,
  divorceOrigin: boolean,
  retirementOrigin: boolean,
  rentOrigin: boolean,
  otherOrigin: boolean,
  otherOriginDescription?: string
}

interface IntendedProductsType {
  fixedIncome: boolean,
  variableIncome: boolean,
  derivatives: boolean,
  mutualFunds: boolean,
  exchange: boolean,
  others: boolean,
  otherIntentionDescription?: string
}

interface SendDataType {
  monthlyIncome: number,
  financialApplications: number,
  otherIncome: number,
  lastYearIncome: number,
  realEstate: number,
  vehicles: number,
  resourceOrigin: OriginType
  intendedProducts: IntendedProductsType
}

export const documentInfoSchema = z.object({
  monthlyIncome: z.number({ required_error: 'Campo obrigatório' }).min(1, { message: 'Digite um valor válido' }),
  financialInvestments: z.number({ required_error: 'Campo obrigatório' }).min(1, { message: 'Digite um valor válido' }),
  otherIncome: z.number({ required_error: 'Campo obrigatório' }).min(1, { message: 'Digite um valor válido' }),
  incomeLastTwelveMonths: z.number({ required_error: 'Campo obrigatório' }).min(1, { message: 'Digite um valor válido' }),
  realEstate: z.number({ required_error: 'Campo obrigatório' }).min(1, { message: 'Digite um valor válido' }),
  movableProperty: z.number({ required_error: 'Campo obrigatório' }).min(1, { message: 'Digite um valor válido' }),
  qualifiedInvestor: z.boolean({ required_error: 'Marque essa opção' }).refine((data) => data === true, { message: 'Marque essa opção' }),


  originOthers: z.boolean(),
  acquireOthers: z.boolean(),
  originOthersResponse: z.string().optional(),
  acquireOthersResponse: z.string().optional(),
})
  .superRefine((data, ctx) => {
    if (data.originOthers === true && !data.originOthersResponse) {
      ctx.addIssue({
        path: ['originOthersResponse'],
        message: 'Preencha o campo',
        code: 'custom'
      });
    }
    if (data.acquireOthers === true && !data.acquireOthersResponse) {
      ctx.addIssue({
        path: ['acquireOthersResponse'],
        message: 'Preencha o campo',
        code: 'custom'
      });
    }

  });

type FormData = z.infer<typeof documentInfoSchema>;

export const Patrimony = () => {
  const [month, setMonth] = useState('');
  const [modaIsOpen, setModalIsOpen] = useState(false);
  const rightInputCheckboxRef = useRef<HTMLInputElement | null>(null);
  const leftInputCheckboxRef = useRef<HTMLInputElement | null>(null);

  const [originOcup, setOriginOcup] = useState(false);
  const [originHer, setOriginHer] = useState(false);
  const [originDon, setOriginDon] = useState(false);
  const [originSpl, setOriginSpl] = useState(false);
  const [originRet, setOriginRet] = useState(false);
  const [originRen, setOriginRen] = useState(false);

  const [getFix, setGetFix] = useState(false);
  const [getVar, setGetVar] = useState(false);
  const [getDer, setGetDer] = useState(false);
  const [getFun, setGetFun] = useState(false);
  const [getRet, setGetRet] = useState(false);
  const [getPro, setGetPro] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    trigger,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(documentInfoSchema),
    defaultValues: {
      acquireOthers: false,
      originOthers: false,
    }

  });

  const [invest, setInvest] = useState(false);

  const navigate = useNavigate();


  const handleSendData = (data: FormData) => {
    console.log(data)
    const selectedData: SendDataType = {
      monthlyIncome: data.monthlyIncome,
      financialApplications: data.financialInvestments,
      otherIncome: data.otherIncome,
      lastYearIncome: data.incomeLastTwelveMonths,
      realEstate: data.realEstate,
      vehicles: data.movableProperty,
      resourceOrigin: {
        professionalOrigin: originOcup,
        heritageOrigin: originHer,
        donationOrigin: originDon,
        divorceOrigin: originSpl,
        retirementOrigin: originRet,
        rentOrigin: originRen,
        otherOrigin: data.originOthers,
        otherOriginDescription: data.originOthersResponse
      },
      intendedProducts: {
        fixedIncome: getFix,
        variableIncome: getVar,
        derivatives: getDer,
        mutualFunds: getFun,
        exchange: getRet,
        others: data.acquireOthers,
        otherIntentionDescription: data.acquireOthersResponse
      }
    }

    fetchAxios.post('http://www.portal-register.web-dev.futuraonline.com.br/api/register/patrimonial/1/1', selectedData,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log('Resposta da API:', response.data);
        navigate("/profile");
      })
      .catch(error => {
        console.error('Erro ao fazer a solicitação:', error);
      });
  }

  console.log(errors, watch('qualifiedInvestor'));

  return (
    <ContainerScreen>
      <S.GeneralContainer>
        <S.LeftContainer>
          <Title
            fs={40}
            fw={600}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="Patrimônio"
          />
          <Text
            fs={20}
            fw={400}
            color={NEUTRAL_COLORS.DARK}
            mt={22}
            value="Chegamos na última etapa! Informe seus dados patrimoniais para oferecermos as ofertas que mais se adequam ao seu perfil de investidor."
          />
          <S.LineInput>
            <Controller
              name="monthlyIncome"
              control={control}
              render={({ field: { value, onChange, ref } }) => (
                <InputCurrency
                  inputProps={{
                    br: 6,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    value: value,
                    onChange: onChange,
                    ph: 'R$ 0,00',
                    onBlur: () => trigger('monthlyIncome'),
                    errorMessage: errors.monthlyIncome?.message,
                    ref
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                    value: "Renda mensal",
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />
            <Controller
              name="financialInvestments"
              control={control}
              render={({ field: { value, onChange, ref } }) => (
                <InputCurrency
                  inputProps={{
                    br: 6,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    value: value,
                    onChange: onChange,
                    ph: 'R$ 0,00',
                    onBlur: () => trigger('financialInvestments'),
                    errorMessage: errors.financialInvestments?.message,
                    ref
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                    value: "Aplicações financeiras",
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />


          </S.LineInput>
          <S.LineInput>
            <Controller
              name="otherIncome"
              control={control}
              render={({ field: { value, onChange, ref } }) => (
                <InputCurrency
                  inputProps={{
                    br: 6,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    value: value,
                    onChange: onChange,
                    ph: 'R$ 0,00',
                    onBlur: () => trigger('otherIncome'),
                    errorMessage: errors.otherIncome?.message,
                    ref
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                    value: "Outros rendimentos?",
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />
            <Controller
              name="incomeLastTwelveMonths"
              control={control}
              render={({ field: { value, onChange, ref } }) => (
                <InputCurrency
                  inputProps={{
                    br: 6,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    value: value,
                    onChange: onChange,
                    ph: 'R$ 0,00',
                    onBlur: () => trigger('incomeLastTwelveMonths'),
                    errorMessage: errors.incomeLastTwelveMonths?.message,
                    ref
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                    value: "Rendimentos dos últimos 12 meses",
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />

          </S.LineInput>
          <S.LineInput>
            <Controller
              name="realEstate"
              control={control}
              render={({ field: { value, onChange, ref } }) => (
                <InputCurrency
                  inputProps={{
                    br: 6,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    value: value,
                    onChange: onChange,
                    ph: 'R$ 0,00',
                    onBlur: () => trigger('realEstate'),
                    errorMessage: errors.realEstate?.message,
                    ref
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                    value: "Valor total de bens imóveis",
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />
            <Controller
              name="movableProperty"
              control={control}
              render={({ field: { value, onChange, ref } }) => (
                <InputCurrency
                  inputProps={{
                    br: 6,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    value: value,
                    onChange: onChange,
                    ph: 'R$ 0,00',
                    onBlur: () => trigger('movableProperty'),
                    errorMessage: errors.movableProperty?.message,
                    ref
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                    value: "Valor total de bens móveis",
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />
          </S.LineInput>
          <S.LineCheckbox>
            <S.LeftContainerSmall>
              <Text
                fs={12}
                fw={400}
                value="Qual é a origem dos seus recursos?"
              />
              <S.LineRadio>
                <CheckBox
                  checked={originOcup}
                  onChange={() => setOriginOcup(!originOcup)}
                />
                <Text
                  fs={12}
                  fw={400}
                  mr={24}
                  value="Ocupação profissional"
                />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  checked={originHer}
                  onChange={() => setOriginHer(!originHer)}
                />
                <Text fs={12} fw={400} mr={24} value="Herança" />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  checked={originDon}
                  onChange={() => setOriginDon(!originDon)}
                />
                <Text fs={12} fw={400} mr={24} value="Doação" />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  checked={originSpl}
                  onChange={() => setOriginSpl(!originSpl)}
                />
                <Text
                  fs={12}
                  fw={400}
                  mr={24}
                  value="Partilha de bens (divórcio)"
                />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  checked={originRet}
                  onChange={() => setOriginRet(!originRet)}
                />
                <Text fs={12} fw={400} mr={24} value="Aposentadoria" />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  checked={originRen}
                  onChange={() => setOriginRen(!originRen)}
                />
                <Text
                  fs={12}
                  fw={400}
                  mr={24}
                  value="Aluguel de propriedades"
                />
              </S.LineRadio>
              <S.LineRadio>
                <Controller
                  name="originOthers"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <CheckBox
                      checked={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  )
                  }
                />
                <Text fs={12} fw={400} mr={24} value="Outros" />
              </S.LineRadio>
              {
                watch('originOthers') && (
                  <Controller
                    name="originOthersResponse"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        inputProps={{
                          br: 6,
                          border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                          value: value,
                          onChange: onChange,
                          onBlur: () => trigger('originOthersResponse'),
                          errorMessage: errors.originOthersResponse?.message
                        }}
                        containerProps={{
                        }}
                        labelProps={{
                        }}
                      />
                    )
                    }
                  />
                )
              }
            </S.LeftContainerSmall>
            <S.RightContainerSmall>
              <Text
                fs={12}
                fw={400}
                value="Quais produtos você pretende adquirir?"
              />
              <S.LineRadio>
                <CheckBox
                  width={25}
                  height={25}
                  checked={getFix}
                  onChange={() => setGetFix(!getFix)}
                />
                <Text fs={12} fw={400} mr={24} value="Renda fixa" />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  width={25}
                  height={25}
                  checked={getVar}
                  onChange={() => setGetVar(!getVar)}
                />
                <Text fs={12} fw={400} mr={24} value="Renda variável" />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  width={25}
                  height={25}
                  checked={getDer}
                  onChange={() => setGetDer(!getDer)}
                />
                <Text fs={12} fw={400} mr={24} value="Derivativos" />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  width={25}
                  height={25}
                  checked={getFun}
                  onChange={() => setGetFun(!getFun)}
                />
                <Text
                  fs={12}
                  fw={400}
                  mr={24}
                  value="Fundos de investimentos"
                />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  width={25}
                  height={25}
                  checked={getRet}
                  onChange={() => setGetRet(!getRet)}
                />
                <Text fs={12} fw={400} mr={24} value="Aposentadoria" />
              </S.LineRadio>
              <S.LineRadio>
                <CheckBox
                  checked={getPro}
                  onChange={() => setGetPro(!getPro)}
                />
                <Text
                  fs={12}
                  fw={400}
                  mr={24}
                  value="Alguel de propriedades"
                />
              </S.LineRadio>
              <S.LineRadio>
                <Controller
                  name="acquireOthers"
                  control={control}
                  render={({ field: { value, onChange, ref } }) => (
                    <CheckBox
                      checked={value}
                      onChange={onChange}
                      ref={ref}
                    />
                  )
                  }
                />
                <Text fs={12} fw={400} mr={24} value="Outros" />
              </S.LineRadio>
              {
                watch('acquireOthers') && (
                  <Controller
                    name="acquireOthersResponse"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <Input
                        inputProps={{
                          br: 6,
                          border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                          value: value,
                          onChange: onChange,
                          onBlur: () => trigger('acquireOthersResponse'),
                          errorMessage: errors.acquireOthersResponse?.message
                        }}
                        containerProps={{
                        }}
                        labelProps={{
                        }}
                      />
                    )
                    }
                  />

                )
              }
            </S.RightContainerSmall>
          </S.LineCheckbox>
          <S.Footer>
            <S.LineRadio>
              <Controller
                name="qualifiedInvestor"
                control={control}
                render={({ field: { value, onChange, ref } }) => (
                  <CheckBox
                    checked={value}
                    onChange={onChange}
                    ref={ref}
                  />
                )
                }
              />
              <S.GeneralText style={{ display: 'flex', fontSize: "12px", fontWeight: "400", alignItems: 'center', gap: '4px' }}>
                Declaro-me{" "}
                <Text
                  fs={12}
                  fw={400}
                  color={PRIMARY_COLORS.ELETRIC_BLUE}
                  td="underline"
                  tdc={PRIMARY_COLORS.ELETRIC_BLUE}
                  pointer
                  value="Investidor qualificado."
                />
              </S.GeneralText>

            </S.LineRadio>
            {errors.qualifiedInvestor && <ErrorMessage text={errors.qualifiedInvestor?.message} />}
          </S.Footer>
          <S.Footer>
            <S.GeneralText style={{ fontSize: "12px", fontWeight: "400" }}>
              Ao continuar declaro que li e aceito os{" "}
              <Text
                fs={12}
                fw={400}
                color={PRIMARY_COLORS.ELETRIC_BLUE}
                td="underline"
                tdc={PRIMARY_COLORS.ELETRIC_BLUE}
                pointer
                value="termos de uso do nosso sistema."
              />
            </S.GeneralText>
          </S.Footer>
          <S.ButtonLine>
            <Button
              onClick={() => navigate("/bankers")}
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
              onClick={handleSubmit(handleSendData)}
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
          <Step step={4} />
          <S.CardContainer>
            <Text
              fs={25}
              fw={700}
              color={NEUTRAL_COLORS.WHITE}
              value="Por que informar meu"
            />
            <Text
              fs={25}
              fw={700}
              mt={4}
              color={"#AACBDE"}
              value="patrimônio?"
            />
            <Text
              fs={16}
              fw={500}
              mt={16}
              color={NEUTRAL_COLORS.WHITE}
              value="Nossa política de segurança de dados requer atenção na prevenção à fraude. Seu endereço também é um ponto de contato para envio de comunicados, notificações e kits institucionais da empresa."
            />
          </S.CardContainer>
        </S.RightContainer>
      </S.GeneralContainer>
      <Modal isOpen={modaIsOpen} setIsOpen={setModalIsOpen} />
    </ContainerScreen>
  );
};
