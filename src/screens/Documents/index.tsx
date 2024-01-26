import { Input } from "../../components/Input";
import { RadioButton } from "../../components/RadioButton";
import { Select } from "../../components/Select";
import { Step } from "../../components/Step";
import { Text } from "../../components/Text";
import { Title } from "../../components/Title";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import * as S from "./style";
import { Button } from "../../components/Button/style";
import { useNavigate } from "react-router-dom";
import { InputFormated } from "../../components/InputFormated";
import { useEffect, useRef, useState } from "react";
import { ContainerScreen } from "../../components/ContainerScreen";
import fetchAxios from "../../services/axios";
import { URL_CONSTANTS, URL_HEADERS } from "../../constants/urlConstants";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertDateFormat } from "../../utils/convertDateFormat";

interface companyDataType {
  companyCnpj?: string,
  companyName?: string
}

interface IssuerType {
  id: number,
  issuerDescription: string
}

interface JobsType {
  id: number,
  name: string
}

interface SendData {
  documentType: string,
  documentNumber?: string,
  cnhSecurityNumber?: string;
  expeditionDate?: string,
  documentIssuerId?: number,
  professionId: number,
  isCurrentlyEmployed: boolean,
  companyData?: companyDataType,
}

export const documentInfoSchema = z.object({
  documentType: z.enum(['CNH', 'RG'], { required_error: 'Selecione o tipo de documento' }),
  document: z.string({ required_error: 'Digite o seu documento' }).min(1, { message: 'Digite o seu documento' }).optional(),
  cpf: z.string({ required_error: 'Digite o nome do co-titular' }).trim().optional(),
  dateExp: z.string({ required_error: 'Digite a data de expedição' }).min(1, { message: 'Digite a data de expedição' }).optional(),
  employmentStatus: z.enum(['working', 'notWorking'], { required_error: 'Selecione o status de emprego' }),
  numberSecurity: z.string().optional(),
  issuingOrganization: z.string().optional(),
  issuingOrganizationState: z.string().optional(),
  companyName: z.string().optional(),
  companyCNPJ: z.string().optional(),
  job: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.documentType) {
    if (!data.document || data.document.trim().length === 0) {
      ctx.addIssue({
        path: ['document'],
        message: 'Digite o seu documento',
        code: 'custom'
      });
    }
    if (!data.document || data.document.trim().length < 11) {
      ctx.addIssue({
        path: ['document'],
        message: 'Deve conter pelo menos 11 números',
        code: 'custom'
      });
    }
    if (!data.dateExp || data.dateExp.trim().length === 0) {
      ctx.addIssue({
        path: ['dateExp'],
        message: 'Digite a data de expedição',
        code: 'custom'
      });
    }
    if (!data.issuingOrganizationState || data.issuingOrganizationState.trim().length === 0) {
      ctx.addIssue({
        path: ['issuingOrganizationState'],
        message: 'Escolha o estado do órgão emissor',
        code: 'custom'
      });
    }
    if (!data.job || data.job.trim().length === 0) {
      ctx.addIssue({
        path: ['job'],
        message: 'Escolha uma profissão',
        code: 'custom'
      });
    }
  }
  if(data.numberSecurity&&data.numberSecurity.trim().length<9){
    ctx.addIssue({
      path: ['numberSecurity'],
      message: 'Número de segurança deve ter no mínimo 9 dígitos',
      code: 'custom'
    });
  }
  if (data.documentType === 'CNH' && (!data.numberSecurity || data.numberSecurity.trim().length === 0)) {
    ctx.addIssue({
      path: ['numberSecurity'],
      message: 'Digite o número de segurança',
      code: 'custom'
    });
  }
  if (data.documentType === 'RG' && (!data.issuingOrganization || data.issuingOrganization.trim().length === 0)) {
    ctx.addIssue({
      path: ['issuingOrganization'],
      message: 'Escolha o orgão emissor',
      code: 'custom'
    });
  }
  if (data.employmentStatus === 'working') {
    if (!data.companyName || data.companyName.trim().length === 0) {
      ctx.addIssue({
        path: ['companyName'],
        message: 'Digite o nome da empresa',
        code: 'custom'
      });
    }
    if (!data.companyCNPJ || data.companyCNPJ.trim().length === 0) {
      ctx.addIssue({
        path: ['companyCNPJ'],
        message: 'Digite o CNPJ da empresa',
        code: 'custom'
      });
    }
    if (!data.companyCNPJ || data.companyCNPJ.trim().length < 14) {
      ctx.addIssue({
        path: ['companyCNPJ'],
        message: 'CNPJ invalido',
        code: 'custom'
      });
    }
  }
});

type FormData = z.infer<typeof documentInfoSchema>;

export const Documents = () => {
  const [states, setStates] = useState([]);
  const [profs, setProfs] = useState([]);
  const [allProfs, setAllProfs] = useState<JobsType[]>();
  const [allIssuers, setAllIssuers] = useState<IssuerType[]>();
  const [issuers, setIssuers] = useState([]);
  const [dateError, setDateError] = useState(""); 

  const navigate = useNavigate();

  const dataInputRef = useRef<HTMLInputElement>(null);

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
    resolver: zodResolver(documentInfoSchema), defaultValues: {
      documentType: 'CNH',
      employmentStatus: 'working',
    }
  });
  
function compareDate(dataString: string): boolean | string {
  const hoje: Date = new Date();
  
  const partesData: string[] = dataString.split('/');
  
  const dataComparacao: Date = new Date(
    parseInt(partesData[2]),
    parseInt(partesData[1]) - 1,
    parseInt(partesData[0])
  );

  console.log( parseInt(partesData[0]))

  if(parseInt(partesData[0])>31 || parseInt(partesData[1]) > 12){
    return false

  }


  if(dataComparacao>hoje){
    console.log('false')
    return false
  }else{
    console.log('true')

    return true

  }
}
  const handleBirthDateBlur = (value: string) => {
console.log(value)
    
    if (value) {
      const isValid = compareDate(value);
      setDateError(isValid ? "" : "Data de nascimento inválida");
    } else {
      setDateError("Digite sua data de nascimento");
    }
  };
  const getState = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/states`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data);
        const filtered = response.data.data.filter((item: { countryCode: string; }) => item.countryCode === 'BRA');
        const staties = filtered.map((stt: { stateCode: any, countryCode: any }) => stt.countryCode === 'BRA' && stt.stateCode);
        setStates(staties);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  const getIssuers = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/issuers`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data);
        setAllIssuers(response.data.data);
        const issus = response.data.data.map((item: { issuerDescription: any }) => item.issuerDescription);
        setIssuers(issus);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  const getProfessions = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/professions`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data[0]);
        setAllProfs(response.data.data[0]);
        const profies = response.data.data[0].map((item: { name: any }) => item.name);
        setProfs(profies);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  const breakpointSmall = window.matchMedia("(max-width: 500px)");

  useEffect(() => {
    getState();
    getIssuers();
    getProfessions();
  }, []);

  const sendRequest = (data: SendData) => {

    fetchAxios.post('http://www.portal-register.web-dev.futuraonline.com.br/api/register/documentation/1/1', data,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log('Resposta da API:', response.data);
        navigate("/declarations");
      })
      .catch(error => {
        console.error('Erro ao fazer a solicitação:', error);
      });
  }

  const handleSendData = (data: FormData) => {
    if(dateError!=="" )
    return alert('A data deve ser menor que o dia de hoje')
    const formatedDate = convertDateFormat(data.dateExp);

    const selectedProf = (allProfs ?? []).find((item: any) => item.name === watch('job'));
    const selectedIssue = (allIssuers ?? []).find((item: any) => item.issuerDescription === watch('issuingOrganization'));
    if (watch('employmentStatus') === 'working') {
      const selectedData: SendData = {
        documentType: data.documentType === 'RG' ? 'RG' : 'CNH',
        documentNumber: data.document,
        cnhSecurityNumber: data.numberSecurity,
        expeditionDate: formatedDate,
        documentIssuerId: data.documentType === 'RG' ? selectedIssue?.id : undefined,
        professionId: selectedProf ? selectedProf.id : 0,
        isCurrentlyEmployed: data.employmentStatus === 'working' ? true : false,
        companyData: {
          companyCnpj: data.companyCNPJ,
          companyName: data.companyName
        },
      }

      sendRequest(selectedData);
      return;
    } else {
      const selectedData: SendData = {
        documentType: data.documentType === 'RG' ? 'RG' : 'CNH',
        documentNumber: data.document,
        expeditionDate: formatedDate,
        documentIssuerId: selectedIssue ? selectedIssue.id : 4,
        professionId: selectedProf ? selectedProf.id : 0,
        isCurrentlyEmployed: data.employmentStatus === 'working' ? true : false,
      }
      sendRequest(selectedData);
      return;
    }
  }
  
  return (
    <ContainerScreen>
      <S.GeneralContainer>
        <S.LeftContainer>
          <Title
            fs={40}
            fw={600}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="Identidade e outros"
          />
          <Text
            fs={20}
            fw={400}
            color={NEUTRAL_COLORS.DARK}
            mt={22}
            value="A informação do seu documento é necessária para garantirmos a segurança e a autenticidade na utilização de nossos produtos."
          />
          <Text fs={12} fw={400} mt={6} value="Escolha um documento*" />
          <S.LineRadio>
            <RadioButton
              name="documentType"
              control={control}
              value={"CNH"}
            />
            <Text fs={12} fw={400} value="CNH" />
            <RadioButton
              name="documentType"
              control={control}
              value={"RG"}
            />
            <Text fs={12} fw={400} value="RG" />
          </S.LineRadio>
          <p>{errors.documentType?.message}</p>
          <S.Linned>
            <Controller
              name="document"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                maxLength={11}
                  inputProps={{
                    br: 6,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    value: value,
                    onChange: onChange,
                    onBlur: () => trigger('document'),
                    errorMessage: errors.document?.message
                  }}
                  containerProps={{
                    mt: 12,
                    width: breakpointSmall.matches ? '100%' : "calc(140% + 20px)",
                  }}
                  labelProps={{
                    value: watch('documentType') === 'CNH' ? "Número do documento" : "Número do RG",
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />
            <Controller
              name="dateExp"
              control={control}
              render={({ field: { onChange, value, ref }, }) => {
                return (
                  <InputFormated
                    inputProps={{
                      maskedValueDate: true,
                      mask: "00/00/0000",
                      ph: "DD/MM/AAAA",
                      value: value,
                      onChange: onChange,
                      ref: ref,
                      onBlur: () =>{value&&handleBirthDateBlur(value)} ,
                      errorMessage: dateError
                    }}
                    containerProps={{
                      mt: 12,
                    }}
                    labelProps={{
                      value: "Data de expedição",
                      color: NEUTRAL_COLORS.DARK,
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
              }
              }
            />

          </S.Linned>
          <S.Linned>
            {watch('documentType') === 'CNH' ? (
              <Controller
                key={1}
                name="numberSecurity"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                  maxLength={9}
                    inputProps={{
                      br: 6,
                      border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                      value: value,
                      onChange: onChange,
                      onBlur: () => trigger('numberSecurity'),
                      errorMessage: errors.numberSecurity?.message
                    }}
                    containerProps={{
                      mt: 12,
                    }}
                    labelProps={{
                      value: "Número de segurança",
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
                }
              />
            ) : (
              <Controller
                key={2}
                name="issuingOrganization"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    inputProps={{
                      options: issuers,
                      onChange: onChange,
                      border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                      br: 6,
                      value: value,
                      color: NEUTRAL_COLORS.DARK,
                      fw: 400,
                      errorMessage: errors.issuingOrganization?.message,
                      onBlur: () => trigger('issuingOrganization')
                    }}
                    containerProps={{
                      mt: 12,
                    }}
                    labelProps={{
                      value: "Órgão emissor",
                      fs: 12,
                      fw: 400,
                      color: NEUTRAL_COLORS.DARK,
                    }}
                  />
                )
                }
              />
            )}
            <Controller
              name="issuingOrganizationState"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  inputProps={{
                    options: states,
                    onChange: onChange,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    br: 6,
                    value: value,
                    color: NEUTRAL_COLORS.DARK,
                    fw: 400,
                    errorMessage: errors.issuingOrganizationState?.message,
                    onBlur: () => trigger('issuingOrganizationState')
                  }}
                  containerProps={{
                    mt: 12,
                    width: breakpointSmall.matches ? '100%' : "70%",
                  }}
                  labelProps={{
                    value: "UF do órgão emissor",
                    fs: 12,
                    fw: 400,
                    color: NEUTRAL_COLORS.DARK,
                  }}
                />
              )
              }
            />
          </S.Linned>
          <Controller
            name="job"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                inputProps={{
                  options: profs,
                  onChange: onChange,
                  border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                  br: 6,
                  value: value,
                  color: NEUTRAL_COLORS.DARK,
                  fw: 400,
                  errorMessage: errors.job?.message,
                  onBlur: () => trigger('job')
                }}
                containerProps={{
                  mt: 12,
                }}
                labelProps={{
                  value: "Profissão",
                  fs: 12,
                  fw: 400,
                  color: NEUTRAL_COLORS.DARK,
                }}
              />
            )
            }
          />
          <Text
            fs={12}
            fw={400}
            mt={8}
            value="Você está trabalhando atualmente?"
          />
          <S.LineRadio>
            <RadioButton name="employmentStatus" value={'working'} control={control} />
            <Text fs={12} fw={400} mr={24} value="Sim" />
            <RadioButton name="employmentStatus" control={control} value={'notWorking'} />

            <Text fs={12} fw={400} value="Não" />
          </S.LineRadio>
          {watch('employmentStatus') === 'working' && (
            <S.Linned>
              <Controller
                name="companyName"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Input
                    inputProps={{
                      br: 6,
                      border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                      value: value,
                      onChange: onChange,
                      onBlur: () => trigger('companyName'),
                      errorMessage: errors.companyName?.message
                    }}
                    containerProps={{
                      mt: 12,
                      width: breakpointSmall.matches ? '100%' : "calc(140% + 20px)",
                    }}
                    labelProps={{
                      value: "Nome da empresa",
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
                }
              />
              <Controller
                name="companyCNPJ"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <InputFormated
                    inputProps={{
                      mask: "00.000.000/0000-00",
                      value: value,
                      onChange: onChange,
                      onBlur: () => trigger('companyCNPJ'),
                      errorMessage: errors.companyCNPJ?.message
                    }}
                    containerProps={{
                      width: "100%",
                      mt: 12,
                    }}
                    labelProps={{
                      value: "CNPJ da empresa",
                      color: NEUTRAL_COLORS.DARK,
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
                }
              />
            </S.Linned>
          )}
          <S.ButtonLine>
            <Button
              onClick={() => navigate("/personal")}
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
          <Step step={1} />
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
              value="documento de identidade?"
            />
            <Text
              fs={16}
              fw={500}
              mt={16}
              color={NEUTRAL_COLORS.WHITE}
              value="Seus dados são coletados para fins de segurança e os mesmos são tratados com sigilo e respeitando nossa política de privacidade."
            />
          </S.CardContainer>
        </S.RightContainer>
      </S.GeneralContainer>
    </ContainerScreen>
  );
};
