import { useNavigate } from "react-router-dom";
import Benefits from "../../assets/icons/benefits/Benefits";
import CallService from "../../assets/icons/call-service/CallService";
import Education from "../../assets/icons/education/Education";
import Security from "../../assets/icons/security/Security";
import { Button } from "../../components/Button/style";
import { CheckBox } from "../../components/ChechBox";
import { Input } from "../../components/Input";
import { Text } from "../../components/Text";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import * as S from "./styles";
import { InputFormated } from "../../components/InputFormated";
import { useEffect, useState, useRef } from "react";
import { Select } from "../../components/Select";
import { ContainerScreen } from "../../components/ContainerScreen";
import fetchAxios from "../../services/axios";
import { URL_CONSTANTS, URL_HEADERS } from "../../constants/urlConstants";
import { useUserProvider } from "../../context/useLoginContext";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionStorage } from "../../context/useSessionStorage";
import { convertDateFormat } from "../../utils/convertDateFormat";
import { TextContinueRegister } from "../../components/TextContinueRegister";

interface SendHome {
  name: string;
  email: string;
  cpf: string;
  birthDate: string | undefined;
  mobileNumber: string;
  automaticAdvisor: boolean;
  advisorCode: number;
}

interface AdvisorsType {
  id: number;
  name: string;
}

interface HubspotData {
  submissionValues?: {
    firstname?: string | null;
    email?: string | null;
    phone?: string | null;
  };
}

export const accountInfoSchema = z
  .object({
    name: z
      .string({ required_error: "Digite o seu nome" })
      .min(1, { message: "Digite o seu nome" })
      .regex(/^[a-zA-Z ]+$/, { message: "Nome inválido" }),
    cpf: z
      .string({ required_error: "Digite o seu CPF" })
      .min(1, { message: "Digite o seu CPF" })
      .trim(),
    phone: z
      .string({ required_error: "Digite seu telefone" })
      .min(1, { message: "Digite seu número de telefone" }),
    email: z
      .string({ required_error: "Digite seu email" })
      .min(1, { message: "Digite o seu email" })
      .email({ message: "Email inválido" }),
    birthDate: z
      .string({ required_error: "Digite a sua data de nascimento" })
      .min(1, { message: "Digite a sua data de nascimento" }),
    hasAcessor: z.boolean(),
    acessor: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.hasAcessor === true && !data.acessor) ||
      (data.hasAcessor === true && data.acessor === "") ||
      (data.hasAcessor === true && data.acessor?.trim().length === 0)
    ) {
      ctx.addIssue({
        path: ["acessor"],
        message: "Selecione um assessor",
        code: "custom",
      });
    }
  });

const validateCpf = (cpf: string) => {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  let remainder;

  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(9, 10))) {
    return false;
  }

  sum = 0;

  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }

  remainder = (sum * 10) % 11;

  if (remainder === 10 || remainder === 11) {
    remainder = 0;
  }

  if (remainder !== parseInt(cpf.substring(10, 11))) {
    return false;
  }

  return true;
};

function compareDate(dataString: string): boolean | string {
  const hoje: Date = new Date();
  
  const partesData: string[] = dataString.split('/');
  
  const dataComparacao: Date = new Date(
    parseInt(partesData[2]),
    parseInt(partesData[1]) - 1,
    parseInt(partesData[0])
  );
  if(parseInt(partesData[0])>31 || parseInt(partesData[1]) > 12){
    return false

  }
  if(dataComparacao>hoje){
    return false
  }else{
    return true
  }
}
type FormData = z.infer<typeof accountInfoSchema>;

export const Home = () => {
  const navigate = useNavigate();
  const { name, email, phone } = useUserProvider();
  const [accessor, setAcessor] = useState("");
  const [dontHaveAcc, setDontHaveAcc] = useState(true);
  const [advisors, setAdvisors] = useState([]);
  const [allAdvisors, setAllAdvisors] = useState<AdvisorsType[]>();

  const [cpfError, setCpfError] = useState(""); 
  const [birthError, setBirthError] = useState(""); 

  const handleCpfBlur = (value: string) => {
    if (value) {
      const isValid = validateCpf(value);
      setCpfError(isValid ? "" : "CPF inválido");
    } else {
      setCpfError("Digite o seu CPF");
    }
  };

  const handleBirthDateBlur = (value: string) => {

    
    if (value) {
      const isValid = compareDate(value);
      setBirthError(isValid ? "" : "Data de nascimento inválida");
    } else {
      setBirthError("Digite sua data de nascimento");
    }
  };

  const { getFromSessionStorage } = useSessionStorage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    trigger,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(accountInfoSchema),
    defaultValues: {
      hasAcessor: false,
    },
  });

  const useRefCpf = useRef<HTMLInputElement | null>(null);
  const useRefName = useRef<HTMLInputElement | null>(null);

  const handleHasAcessorChange = () => {
    const currentValue = watch("hasAcessor");
    setValue("hasAcessor", !currentValue);
    setDontHaveAcc(currentValue); // Se tem acessor, então não marcar "Não tenho acessor"
  };

  const handleDontHaveAccChange = () => {
    const currentValue = watch("hasAcessor");
    if (currentValue) {
      setValue("hasAcessor", false);
    }
    setDontHaveAcc(!dontHaveAcc);
  };

  const getAdvisors = () => {
    fetchAxios
      .get(`${URL_CONSTANTS.URL_BASE}/register/lookup/advisors`, {
        headers: {
          "Content-Type": URL_HEADERS.CONTENT_TYPE,
          Authorization: URL_HEADERS.AUTHORIZATION,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setAllAdvisors(response.data.data);
        const adv = response.data.data.map(
          (item: { name: any; id: any }) => `${item.id} - ${item.name}`
        );
        setAdvisors(adv);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  useEffect(() => {
    getAdvisors();
  }, []);

  useEffect(() => {
    const dataHubspot: HubspotData = getFromSessionStorage("hubspotFormData");

    if (dataHubspot !== null && dataHubspot !== undefined) {
      setValue(
        "name",
        dataHubspot?.submissionValues?.firstname
          ? dataHubspot.submissionValues.firstname
          : ""
      );
      setValue(
        "email",
        dataHubspot?.submissionValues?.email
          ? dataHubspot.submissionValues.email
          : ""
      );
      setValue(
        "phone",
        dataHubspot?.submissionValues?.phone
          ? dataHubspot.submissionValues.phone
          : ""
      );
    }

    if (!dataHubspot) {
      useRefName.current?.focus();
    } else {
      useRefCpf.current?.focus();
    }
  }, [getFromSessionStorage, setValue, useRefCpf]);

  const handleSendData = (data: FormData) => {

    if(birthError!=="" || cpfError!=="")
      return alert('Preencha os campos da maneira correta')
    const selectedAdv = (allAdvisors ?? []).find(
      (item: any) => item.name === accessor
    );
    const formatedDate = convertDateFormat(data.birthDate);
    const checkCpf = validateCpf(data.cpf);

    const selectedData: SendHome = {
      name: data.name,
      email: data.email,
      cpf: checkCpf ? data.cpf : "",
      birthDate: formatedDate,
      mobileNumber: data.phone,
      automaticAdvisor: data.hasAcessor,
      advisorCode: selectedAdv ? selectedAdv.id : 230,
    };
    console.log(selectedData);

    fetchAxios
      .post(
        "http://www.portal-register.web-dev.futuraonline.com.br/api/register/prospect/1/1",
        selectedData,
        {
          headers: {
            "Content-Type": URL_HEADERS.CONTENT_TYPE,
            Authorization: URL_HEADERS.AUTHORIZATION,
          },
        }
      )
      .then((response) => {
        console.log("Resposta da API:", response.data);
        navigate("/personal");
      })
      .catch((error) => {
        console.error("Erro ao fazer a solicitação:", error);
      });
  };



  return (
    <ContainerScreen>
      <S.GeneralContainer>
        <S.LeftContainer>
          <h1>Olá! Seja bem-vindo!</h1>
          <Text
            fs={20}
            fw={400}
            mt={12}
            color={NEUTRAL_COLORS.DARK}
            value="Falta pouco para você fazer seu primeiro investimento na Nova Futura. Basta preencher os dados abaixo e iniciar sua jornada."
          />
         <TextContinueRegister/>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                inputProps={{
                  br: 6,
                  border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                  width: "100%",
                  fw: 400,
                  ph: "Nome",
                  value: value,
                  errorMessage: errors.name?.message,
                  onChange: onChange,
                  onBlur: () => trigger("name"),
                  ref: useRefName,
                }}
                containerProps={{
                  mt: 12,
                }}
                labelProps={{
                  value: "Nome completo (Sem abreviações)",
                  color: NEUTRAL_COLORS.DARK,
                  fs: 12,
                  fw: 400,
                }}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                inputProps={{
                  br: 6,
                  border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                  fw: 400,
                  ph: "E-mail",
                  value: value,
                  onChange: onChange,
                  onBlur: () => trigger("email"),
                  errorMessage: errors.email?.message,
                }}
                containerProps={{}}
                labelProps={{
                  value: "E-mail",
                  color: NEUTRAL_COLORS.DARK,
                  fs: 12,
                  fw: 400,
                }}
              />
            )}
          />
          <S.DoubleContainer>
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
                    errorMessage: cpfError,
                    onBlur: () => handleCpfBlur(value),
                    ref: useRefCpf
                  }}
                  containerProps={{}}
                  labelProps={{
                    value: "CPF",
                    color: NEUTRAL_COLORS.DARK,
                    fs: 12,
                    fw: 400,
                  }}
                />
              )
              }
            />
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFormated
                  inputProps={{
                    maskedValueDate: true,
                    mask: "00/00/0000",
                    ph: "31/01/2000",
                    value: value,
                    onChange: onChange,
                    errorMessage: birthError,
                    onBlur: () => handleBirthDateBlur(value),
                  }}
                  containerProps={{}}
                  labelProps={{
                    value: "Data de nascimento",
                    color: NEUTRAL_COLORS.DARK,
                    fs: 12,
                    fw: 400,
                  }}
                />
              )}
            />
          </S.DoubleContainer>
          <S.DoubleContainer>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFormated
                  inputProps={{
                    mask: "(00) 00000-0000",
                    ph: "(XX) 98765 4321",
                    value: value,
                    onChange: onChange,
                    errorMessage: errors.phone?.message,
                    onBlur: () => trigger("phone"),
                  }}
                  containerProps={{
                    width: "calc(50% - 10px)",
                  }}
                  labelProps={{
                    value: "Celular com DDD",
                    color: NEUTRAL_COLORS.DARK,
                    fs: 12,
                    fw: 400,
                  }}
                />
              )}
            />
          </S.DoubleContainer>
          <Text
            value="Você possui um assessor?"
            fs={15}
            fw={400}
            color={NEUTRAL_COLORS.DARK}
          />
          <S.CheckLine>
            <S.CheckLine>
              <Controller
                name="hasAcessor"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <CheckBox checked={value} onChange={handleHasAcessorChange} />
                )}
              />
              <Text
                value="Sim"
                fs={15}
                fw={400}
                mr={12}
                color={NEUTRAL_COLORS.DARK}
              />
            </S.CheckLine>
            <S.CheckLine>
              <CheckBox
                checked={dontHaveAcc}
                onChange={handleDontHaveAccChange}
              />
              <Text value="Não" fs={15} fw={400} color={NEUTRAL_COLORS.DARK} />
            </S.CheckLine>
          </S.CheckLine>
          {watch("hasAcessor") && (
            <Controller
              name="acessor"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  inputProps={{
                    options: advisors,
                    onChange: onChange,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    br: 6,
                    value: value,
                    color: NEUTRAL_COLORS.DARK,
                    fw: 400,
                    errorMessage: errors.acessor?.message,
                    onBlur: () => trigger("acessor"),
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                    value: "Acessor",
                    fs: 12,
                    fw: 400,
                    color: NEUTRAL_COLORS.DARK,
                  }}
                />
              )}
            />
          )}
          <S.InfoLineStart>
            <S.GeneralText style={{ display: 'flex', marginTop: '12px', fontSize: "15px", fontWeight: "400", alignItems: 'center', gap: '4px' }}>
              Ao continuar declaro que le e aceitos as{" "}
              <Text
                fs={15}
                fw={400}
                color={PRIMARY_COLORS.ELETRIC_BLUE}
                td="underline"
                tdc={PRIMARY_COLORS.ELETRIC_BLUE}
                pointer
                value="Políticas de Privacidade"
              />
            </S.GeneralText>
          </S.InfoLineStart>
           <S.GeneralText style={{ display: 'flex', fontSize: "15px", fontWeight: "400", alignItems: 'center', gap: '4px', marginTop: '-8px' }}>
            e concordo e aceito com a{" "}
            <Text
              fs={15}
              fw={400}
              color={PRIMARY_COLORS.ELETRIC_BLUE}
              td="underline"
              tdc={PRIMARY_COLORS.ELETRIC_BLUE}
              pointer
              value="coleta, tratamento e compartilhamento de dados."
            />
          </S.GeneralText>
          <Button
            onClick={handleSubmit(handleSendData)}
            values={{
              color: NEUTRAL_COLORS.WHITE,
              border: `2px solid ${PRIMARY_COLORS.NIGHT_BLUE}`,
              bgc: PRIMARY_COLORS.NIGHT_BLUE,
              height: 50,
              width: 170,
            }}
          >
            Continuar
          </Button>
        </S.LeftContainer>
        <S.RightContainer>
          <S.InfoContainer>
            <h1>Tenha apenas vantagens em investir seu dinheiro conosco!</h1>
            <S.InfoLine>
              <Security />
              <S.InfoRow>
                <h2>Invista com Segurança</h2>
                <p>Várias opções com proteção do FGC.</p>
              </S.InfoRow>
            </S.InfoLine>
            <S.InfoLine>
              <Benefits />
              <S.InfoRow>
                <h2>O melhor custo-benefício</h2>
                <p>
                  As melhores plataformas com os maiores profissionais do
                  mercado.
                </p>
              </S.InfoRow>
            </S.InfoLine>
            <S.InfoLine>
              <Education />
              <S.InfoRow>
                <h2>Educação Financeira"</h2>
                <p>
                  Sala ao vivo, carteira recomendada, análise diárias e eventos.
                </p>
              </S.InfoRow>
            </S.InfoLine>
            <S.InfoLine>
              <CallService />
              <S.InfoRow>
                <h2>Atendimento Especialista</h2>
                <p>Aqui o nosso cliente é nossa prioridade.</p>
              </S.InfoRow>
            </S.InfoLine>
          </S.InfoContainer>
        </S.RightContainer>
      </S.GeneralContainer>
    </ContainerScreen>
  );
};
