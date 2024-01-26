import { useEffect, useState } from "react";
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
import { URL_CONSTANTS, URL_HEADERS } from "../../constants/urlConstants";
import fetchAxios from "../../services/axios";
import { Header } from "../../components/Header";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "../../components/ErrorMessage";
import { InputFormated } from "../../components/InputFormated";
import { ContainerScreen } from "../../components/ContainerScreen";


interface Nationality {
  nationalityId: number;
  name: string;
}

interface CivilStatus {
  civilStatusId: number;
  name: string;
}

interface CountryStatus {
  code: string;
  name: string;
}

interface BirthData {
  state?: string,
  city?: string
}

interface SpouseData {
  name?: string,
  documentNumber?: string,
}

interface SendPersonal {
  gender: string,
  motherName: string,
  fatherName?: string,
  nationality: number,
  birthState?: string,
  birthCity?: string,
  birthCountry: string,
  birthData?: BirthData,
  civilStatus: number,
  spouseData?: SpouseData
}

export const personalDataInfoSchema = z.object({
  cpf: z.string({ required_error: 'Digite o nome do co-titular' }).trim().optional(),
  gender: z.enum(['M', 'F'], { required_error: 'Selecione um dos campos' }),
  motherName: z.string({ required_error: 'Digite o nome da mãe' }).min(1, { message: 'Digite o nome da mãe' }),
  fatherName: z.string().optional(),
  companyCNJP: z.string().optional(),
  nationality: z.string({ required_error: 'Selecione um dos campos' }).min(1, { message: 'Selecione um dos campos' }),
  state: z.string({ required_error: 'Selecione um dos campos' }).min(1, { message: 'Selecione um dos campos' }).optional(),
  city: z.string({ required_error: 'Selecione um dos campos' }).min(1, { message: 'Selecione um dos campos' }).optional(),
  maritalStatus: z.string({ required_error: 'Selecione um dos campos' }).min(1, { message: 'Selecione um dos campos' }),
  country: z.string().optional(),
  spouseName: z.string({ required_error: 'Selecione um dos campos' }).min(1, { message: 'Selecione um dos campos' }).optional(),
  spouseCpf: z.string({ required_error: 'Selecione um dos campos' }).min(1, { message: 'Selecione um dos campos' }).optional(),
}).superRefine((data, ctx) => {
  if (data.nationality !== "BRASILEIRO NATO" || !data.nationality || data.nationality.trim()?.length === 0) {
    if (!data.country || data.country.trim()?.length === 0) {
      ctx.addIssue({
        path: ['country'],
        message: 'Selecione um dos campos',
        code: 'custom'
      })
    }
  }
  if (data.nationality === "BRASILEIRO NATO") {
    if (!data.state || data.state.trim()?.length === 0) {
      ctx.addIssue({
        path: ['state'],
        message: 'Selecione um dos campos',
        code: 'custom'
      })
    }
    if (!data.city || data.city.trim().length === 0) {
      ctx.addIssue({
        path: ['city'],
        message: 'Selecione um dos campos',
        code: 'custom'
      })
    }

  }
  if (data.nationality === "BRASILEIRO NATURALIZADO") {
    if (!data.country || data.country.trim().length === 0) {
      ctx.addIssue({
        path: ['country'],
        message: 'Selecione um dos campos',
        code: 'custom'
      })
    }
  }
  if (data.maritalStatus !== "SOLTEIRO(A)" &&
    data.maritalStatus !== "DESQUITADO(A)" &&
    data.maritalStatus !== "VIUVO(A)" &&
    data.maritalStatus !== "DIVORCIADO(A)" &&
    data.maritalStatus !== "" && data.maritalStatus !== undefined) {
    if (data.spouseName === "" || data.spouseName === undefined || data.spouseName.trim().length === 0) {
      ctx.addIssue({
        path: ['spouseName'],
        message: 'Digite o nome do cônjuge',
        code: 'custom'
      })
    }
  }
  if (data.maritalStatus !== "SOLTEIRO(A)" &&
    data.maritalStatus !== "DESQUITADO(A)" &&
    data.maritalStatus !== "VIUVO(A)" &&
    data.maritalStatus !== "DIVORCIADO(A)" &&
    data.maritalStatus !== "" && data.maritalStatus !== undefined) {
    if (data.spouseCpf === "" || data.spouseCpf === undefined || data.spouseCpf.trim().length === 0) {
      ctx.addIssue({
        path: ['spouseCpf'],
        message: 'Digite o CPF do cônjuge',
        code: 'custom'
      })
    }
  }
});

type FormData = z.infer<typeof personalDataInfoSchema>;

export const PersonalData = () => {

  const [nation, setNation] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [allCivilStatus, setAllCivilStatus] = useState([]);
  const [allCountries, setAllCountries] = useState([]);

  const [allNat, setAllNat] = useState<Nationality[]>();
  const [allStatus, setAllStatus] = useState<CivilStatus[]>();
  const [fullCountries, setFullCountries] = useState<CountryStatus[]>();

  const navigate = useNavigate();

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
    resolver: zodResolver(personalDataInfoSchema),
  });

  const getNationality = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/nationalities`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data);
        setAllNat(response.data.data);
        const nationalities = response.data.data.map((nation: { name: any; }) => nation.name);
        setNation(nationalities);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
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

  const getCities = (selectedState: string | undefined) => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/cities?state=${selectedState}`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data);
        const cities = response.data.data.map((city: { cityName: any }) => city.cityName);
        setCities(cities);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  const getCivilStatus = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/civil-status`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data);
        setAllStatus(response.data.data);
        const cStatus = response.data.data.map((statuses: { name: any }) => statuses.name);
        setAllCivilStatus(cStatus);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  const getCountries = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/countries`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data);
        setFullCountries(response.data.data);
        const countries = response.data.data.map((item: { name: any }) => item.name);
        setAllCountries(countries);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  useEffect(() => {
    getNationality();
    getState();
    getCivilStatus();
    getCountries();
  }, []);

  useEffect(() => {
    getCities(watch('state'));
  }, [watch('state')]);

  const handleSendData = (data: FormData) => {

    const selectedNat = (allNat ?? []).find((item: any) => item.name === watch('nationality'));
    const selectedStatus = (allStatus ?? []).find((item: any) => item.name === watch('maritalStatus'));
    const selectedCountry = (fullCountries ?? []).find((item: any) => item.name === watch('country'));

    const selectedData: SendPersonal = {
      gender: data.gender,
      motherName: data.motherName,
      fatherName: data.fatherName,
      nationality: selectedNat ? selectedNat.nationalityId : 0,
      birthState: data.state,
      birthCity: data.city,
      birthCountry: selectedCountry ? selectedCountry.code : 'BRA',
      birthData: !selectedCountry ? {
        state: data.state,
        city: data.city
      } : undefined,
      civilStatus: selectedStatus ? selectedStatus.civilStatusId : 0,
      spouseData: (watch('maritalStatus') !== "SOLTEIRO(A)" &&
        watch('maritalStatus') !== "DESQUITADO(A)" &&
        watch('maritalStatus') !== "VIUVO(A)" &&
        watch('maritalStatus') !== "DIVORCIADO(A)" &&
        watch('maritalStatus') !== "") ? {
        name: data.spouseName,
        documentNumber: data.spouseCpf
      } : undefined
    }

    console.log('selectedData', selectedData);
    fetchAxios.post('http://www.portal-register.web-dev.futuraonline.com.br/api/register/personal/1/1', selectedData,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log('Resposta da API:', response.data);
        navigate("/documents");
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
            value="Dados pessoais"
          />
          <Text
            fs={20}
            fw={400}
            color={NEUTRAL_COLORS.DARK}
            mt={22}
            value="Sua conta foi criada com sucesso, mas vamos precisar de mais algumas informações para finalizar seu cadastro completo, vamos continuar?"
          />
          <Text fs={12} fw={600} mt={6} value="Sexo*" />
          <S.LineRadio>
            <RadioButton name="gender" value={'M'} control={control} />
            <Text fs={14} fw={400} mr={24} value="Masculino" />
            <RadioButton name="gender" value={'F'} control={control} />
            <Text fs={14} fw={400} value="Feminino" />
          </S.LineRadio>
          {errors.gender && <ErrorMessage text={errors.gender?.message} />}
          <Controller
            name="motherName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                inputProps={{
                  br: 6,
                  border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                  value: value,
                  onChange: onChange,
                  onBlur: () => trigger('motherName'),
                  errorMessage: errors.motherName?.message
                }}
                containerProps={{
                  mt: 18,
                }}
                labelProps={{
                  value: "Nome da mãe",
                  fs: 12,
                  fw: 600,
                }}
              />
            )
            }
          />
          <Controller
            name="fatherName"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                inputProps={{
                  br: 6,
                  border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                  value: value,
                  onChange: onChange,
                  onBlur: () => trigger('fatherName'),
                  errorMessage: errors.fatherName?.message
                }}
                containerProps={{
                  mt: 18,
                }}
                labelProps={{
                  value: "Nome do pai (opcional)",
                  fs: 12,
                  fw: 600,
                }}
              />
            )
            }
          />
          <Controller
            name="nationality"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                inputProps={{
                  options: nation,
                  onChange: onChange,
                  border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                  br: 6,
                  value: value,
                  color: NEUTRAL_COLORS.DARK,
                  fw: 400,
                  errorMessage: errors.nationality?.message,
                  onBlur: () => trigger('nationality')
                }}
                containerProps={{
                  mt: 8,
                }}
                labelProps={{
                  value: "Nacionalidade",
                  fs: 12,
                  fw: 600,
                  color: NEUTRAL_COLORS.DARK,
                }}
              />
            )
            }
          />
          {watch('nationality') === "BRASILEIRO NATO" && (
            <S.LineInput>
              <Controller
                name="state"
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
                      errorMessage: errors.state?.message,
                      onBlur: () => trigger('state')
                    }}
                    containerProps={{
                      mt: 8,
                    }}
                    labelProps={{
                      value: "Estado onde nasceu*",
                      fs: 12,
                      fw: 600,
                      color: NEUTRAL_COLORS.DARK,
                    }}
                  />
                )
                }
              />
              <Controller
                name="city"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Select
                    inputProps={{
                      options: cities,
                      onChange: onChange,
                      border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                      br: 6,
                      value: value,
                      color: NEUTRAL_COLORS.DARK,
                      fw: 400,
                      errorMessage: errors.city?.message,
                      onBlur: () => trigger('city')
                    }}
                    containerProps={{
                      mt: 8,
                    }}
                    labelProps={{
                      value: "Cidade onde nasceu*",
                      fs: 12,
                      fw: 600,
                      color: NEUTRAL_COLORS.DARK,
                    }}
                  />
                )
                }
              />
            </S.LineInput>
          )} {
            watch('nationality') !== "BRASILEIRO NATO" && watch('nationality')?.length > 0 && (
              <S.LineInput>
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Select
                      inputProps={{
                        options: allCountries,
                        onChange: onChange,
                        border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                        br: 6,
                        value: value,
                        color: NEUTRAL_COLORS.DARK,
                        fw: 400,
                        errorMessage: errors.country?.message,
                        onBlur: () => trigger('country')
                      }}
                      containerProps={{
                        mt: 8,
                      }}
                      labelProps={{
                        value: "País onde nasceu*",
                        fs: 12,
                        fw: 600,
                        color: NEUTRAL_COLORS.DARK,
                      }}
                    />
                  )
                  }
                />
              </S.LineInput>
            )
          }
          <S.LineInput>
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  inputProps={{
                    options: allCivilStatus,
                    onChange: onChange,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    br: 6,
                    value: value,
                    color: NEUTRAL_COLORS.DARK,
                    fw: 400,
                    errorMessage: errors.maritalStatus?.message,
                    onBlur: () => trigger('maritalStatus')
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                    value: "Estado civil*",
                    fs: 12,
                    fw: 600,
                    color: NEUTRAL_COLORS.DARK,
                  }}
                />
              )
              }
            />
          </S.LineInput>
          {(watch('maritalStatus') !== "SOLTEIRO(A)" &&
            watch('maritalStatus') !== "DESQUITADO(A)" &&
            watch('maritalStatus') !== "VIUVO(A)" &&
            watch('maritalStatus') !== "DIVORCIADO(A)" &&
            watch('maritalStatus') !== "" && watch('maritalStatus') !== undefined) && (
              <S.LineInput>
                <Controller
                  name="spouseName"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <Input
                      inputProps={{
                        br: 6,
                        border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                        value: value,
                        onChange: onChange,
                        onBlur: () => trigger('spouseName'),
                        errorMessage: errors.spouseName?.message
                      }}
                      containerProps={{
                        mt: 8,
                      }}
                      labelProps={{
                        value: "Nome do cônjuge",
                        fs: 12,
                        fw: 600,
                      }}
                    />
                  )
                  }
                />
                <Controller
                  name="spouseCpf"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputFormated
                      inputProps={{
                        mask: "000.000.000-00",
                        ph: "123.456.789-00",
                        value: value,
                        onChange: onChange,
                        errorMessage: errors.spouseCpf?.message,
                        onBlur: () => trigger('spouseCpf'),
                      }}
                      containerProps={{
                        mt: 8,
                        width: '60%'
                      }}
                      labelProps={{
                        value: "CPF do cônjuge",
                        fs: 12,
                        fw: 600,
                      }}
                    />
                  )
                  }
                />
              </S.LineInput>
            )}
          <S.ButtonLine>
            <Button
              onClick={() => navigate("/home")}
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
              value="Por que pedimos suas"
            />
            <Text
              fs={25}
              fw={700}
              mt={4}
              color={"#AACBDE"}
              value="informações pessoais?"
            />
            <Text
              fs={16}
              fw={500}
              mt={16}
              color={NEUTRAL_COLORS.WHITE}
              value="Para garantir sua segurança. Além disso, é importante que você tenha um acompanhamento próximo dos seus investimentos, recebendo informações úteis e atualizadas de nossas melhores condições."
            />
          </S.CardContainer>
        </S.RightContainer>
      </S.GeneralContainer>
    </ContainerScreen>
  );
};

