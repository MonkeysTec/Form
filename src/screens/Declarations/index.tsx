import { RadioButton } from "../../components/RadioButton";
import { Step } from "../../components/Step";
import { Text } from "../../components/Text";
import { Title } from "../../components/Title";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import * as S from "./style";
import { Button } from "../../components/Button/style";
import { useNavigate } from "react-router-dom";
import { CheckBox } from "../../components/ChechBox";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { InputFormated } from "../../components/InputFormated";
import { Select } from "../../components/Select";
import { ContainerScreen } from "../../components/ContainerScreen";
import fetchAxios from "../../services/axios";
import { URL_CONSTANTS, URL_HEADERS } from "../../constants/urlConstants";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { declarationInfoSchema } from "../../models/formValidation";
import { ErrorMessage } from "../../components/ErrorMessage";
import { convertDateFormat } from "../../utils/convertDateFormat";

interface ProcuratorType {
  name?: string,
  documentNumber?: string,
  birthDate?: string,
  address: AddressType
}

interface AddressType {
  zipCode?: string,
  addressName?: string,
  number: number,
  complement?: string,
  neighborhood?: string,
  city?: string,
  state?: string,
}

interface LegalGuardianType {
  name?: string,
  documentNumber?: string,
  birthDate?: string,
  clientSituation?: string,
  legalGuardianType?: string
}

interface SendDataType {
  relatedPerson: boolean,
  isUsPerson: boolean,
  ownAccount: boolean,
  politicallyExposed: boolean,
  politicallyExposedJustification?: string,
  thirdPartyOrders: boolean,
  thirdPartyType?: string,
  procurator?: ProcuratorType,
  legalGuardian?: LegalGuardianType
}

type FormData = z.infer<typeof declarationInfoSchema>;

export const Declarations = () => {
  const [vinc, setVinc] = useState(false);
  const [usp, setUsp] = useState(false);
  const [own, setOwn] = useState(true);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [justificativas, setJustificativas] = useState([]);


  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    control,
    trigger,
    watch
  } = useForm<FormData>({
    resolver: zodResolver(declarationInfoSchema),
    defaultValues: {
      authPeerThird: false,
      cep: '',
      isPoliticallyExposed: false,
    }
  });

  console.log(errors);

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

  const getJustificativas = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/politically-exposed`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data);
        const justf = response.data.data.map((jus: { description: any }) => jus.description);
        setJustificativas(justf);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  const getCep = () => {
    fetchAxios.get(
      `${URL_CONSTANTS.URL_BASE}/register/lookup/address?cep=${watch('cep')}`,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log(response.data.data[0]);
        setValue('address', response.data.data[0].logradouro);
        setValue('neighborhood', response.data.data[0].bairro);
        setValue('state', response.data.data[0].uf);
        setValue('city', response.data.data[0].localidade);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  }

  useEffect(() => {
    getState();
    getJustificativas();
  }, []);

  useEffect(() => {
    getCities(watch('state'));
  }, [watch('state')]);

  useEffect(() => {
    const cepValue = watch('cep');
    if (cepValue && cepValue.length >= 8) {
      getCep();
    }
  }, [watch('cep')]);

  const sendDataRequest = (data: SendDataType) => {
    fetchAxios.post('http://www.portal-register.web-dev.futuraonline.com.br/api/register/declarations/1/1', data,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log('Resposta da API:', response.data);
        navigate("/residential")
      })
      .catch(error => {
        console.error('Erro ao fazer a solicitação:', error);
      });
  }

  const handleSendData = (data: FormData) => {
    if (watch('prosecutorOrRepresentative'))
      setOwn(false);
      const formatedDate = convertDateFormat(data.dateBirth);

    if (watch('authPeerThird')) {
      if (watch('prosecutorOrRepresentative') === "REPRESENTANTE_LEGAL") {
        const selectedData: SendDataType = {
          relatedPerson: vinc,
          isUsPerson: usp,
          ownAccount: own,
          politicallyExposed: watch('isPoliticallyExposed'),
          politicallyExposedJustification: watch('justifications'),
          thirdPartyOrders: true,
          thirdPartyType: watch('prosecutorOrRepresentative'),
          legalGuardian: {
            name: data.name,
            documentNumber: data.document,
            birthDate: formatedDate,
            clientSituation: data.clientType,
            legalGuardianType: data.responsibleType
          },
        }
        sendDataRequest(selectedData);
        return;
      } else if (watch('prosecutorOrRepresentative') === "PROCURADOR") {
        const selectedData: SendDataType = {
          relatedPerson: vinc,
          isUsPerson: usp,
          ownAccount: own,
          politicallyExposed: watch('isPoliticallyExposed'),
          politicallyExposedJustification: watch('justifications'),
          thirdPartyOrders: true,
          thirdPartyType: watch('prosecutorOrRepresentative'),
          procurator: {
            name: data.name,
            documentNumber: data.document,
            birthDate: formatedDate,
            address: {
              zipCode: data.cep,
              addressName: data.address,
              number: Number(data.streetNumber),
              complement: data.complement,
              neighborhood: data.neighborhood,
              city: data.city,
              state: data.state,
            }
          },
        }
        sendDataRequest(selectedData);
        return;
      }
    } else {
      const selectedData: SendDataType = {
        relatedPerson: vinc,
        isUsPerson: usp,
        ownAccount: own,
        politicallyExposed: watch('isPoliticallyExposed'),
        politicallyExposedJustification: watch('justifications'),
        thirdPartyOrders: false,
      }
      sendDataRequest(selectedData);
      return;
    }
  }

  console.log(watch('responsibleType'), errors);

  return (
    <ContainerScreen>
      <S.GeneralContainer>
        <S.LeftContainer>
          <Title
            fs={40}
            fw={600}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="Declarações"
          />
          <Text
            fs={20}
            fw={400}
            color={NEUTRAL_COLORS.DARK}
            mt={22}
            value="Suas respostas nos ajudam a assegurar conformidade e segurança nas suas operações financeiras."
          />
          <S.CheckLine>
            <CheckBox checked={vinc} onChange={() => setVinc(!vinc)} />
            <Text
              value="É pessoa vinculada a corretora?"
              fs={15}
              fw={400}
              mr={12}
              color={NEUTRAL_COLORS.DARK}
            />
          </S.CheckLine>
          <S.CheckLine>
            <CheckBox checked={usp} onChange={() => setUsp(!usp)} />
            <Text
              value="Você é US Person?"
              fs={15}
              fw={400}
              mr={12}
              color={NEUTRAL_COLORS.DARK}
            />
          </S.CheckLine>
          <S.CheckLine>
            <CheckBox checked={watch('authPeerThird') ? !watch('authPeerThird') : own} onChange={() => setOwn(!own)} />
            <Text fs={15} fw={400} value="Você opera por conta própria?" />
          </S.CheckLine>
          <S.CheckLine>
            <Controller
              name="isPoliticallyExposed"
              control={control}
              render={({ field: { onChange, value, ref }, }) => (
                <CheckBox ref={ref} checked={value} onChange={onChange} />
              )
              }
            />
            <Text
              value="É uma pessoa politicamente exposta?"
              fs={15}
              fw={400}
              mr={12}
              color={NEUTRAL_COLORS.DARK}
            />
          </S.CheckLine>
          {watch('isPoliticallyExposed') === true && (
            <Controller
              name="justifications"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  inputProps={{
                    options: justificativas,
                    onChange: onChange,
                    border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                    br: 6,
                    value: value,
                    color: NEUTRAL_COLORS.DARK,
                    fw: 400,
                    errorMessage: errors.justifications?.message,
                    onBlur: () => trigger('justifications')
                  }}
                  containerProps={{
                    mt: 8,
                  }}
                  labelProps={{
                  }}
                />
              )
              }
            />
          )}
          <S.CheckLine>
            <Controller
              name="authPeerThird"
              control={control}
              render={({ field: { onChange, value, ref } }) => (
                <CheckBox checked={value} onChange={onChange} ref={ref} />
              )
              }
            />

            <Text
              fs={15}
              fw={400}
              value="Autoriza a transmissão de ordens por terceiros?"
            />
          </S.CheckLine>
          {watch('authPeerThird') && (
            <>
              <Text
                value="Procurador ou representante?"
                fs={15}
                fw={400}
                mt={24}
                color={NEUTRAL_COLORS.DARK}
              />
              <S.CheckLine>
                <S.CheckLineInside>

                  <RadioButton
                    name="prosecutorOrRepresentative"
                    value={'PROCURADOR'}
                    control={control}
                  />

                  <Text
                    value="Procurador"
                    fs={15}
                    fw={400}
                    mr={12}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLineInside>
                <S.CheckLineInside>
                  <RadioButton
                    name="prosecutorOrRepresentative"
                    value={'REPRESENTANTE_LEGAL'}
                    control={control}
                  />
                  <Text
                    value="Representante"
                    fs={15}
                    fw={400}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLineInside>
              </S.CheckLine>
              {errors.prosecutorOrRepresentative?.message && <ErrorMessage text={errors.prosecutorOrRepresentative?.message} />}
            </>
          )}
          {watch('prosecutorOrRepresentative') === 'PROCURADOR' && watch('authPeerThird') && (
            <>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    inputProps={{
                      br: 6,
                      border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                      value: value,
                      onChange: onChange,
                      onBlur: () => trigger('name'),
                      errorMessage: errors.name?.message
                    }}
                    containerProps={{
                      mt: 18,
                    }}
                    labelProps={{
                      value: "Nome",
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
                }
              />
              <S.DoubleContainer>
                <Controller
                  name="document"
                  control={control}
                  render={({ field: { onChange, value, ref } }) => (
                    <InputFormated
                      inputProps={{
                        mask: "000.000.000-00",
                        ph: "123.456.789-00",
                        value: value,
                        onChange: onChange,
                        errorMessage: errors.document?.message,
                        onBlur: () => trigger('document'),
                        ref: ref
                      }}
                      containerProps={{
                        mt: 12,
                      }}
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
                  name="dateBirth"
                  control={control}
                  render={({ field: { onChange, value, ref }, }) => {
                    return (
                      <InputFormated
                        inputProps={{
                          maskedValueDate: true,
                          mask: "00/00/0000",
                          ph: "31/01/2000",
                          value: value,
                          onChange: onChange,
                          ref: ref,
                          onBlur: () => trigger('dateBirth'),
                          errorMessage: errors.dateBirth?.message
                        }}
                        containerProps={{
                          mt: 12,
                        }}
                        labelProps={{
                          value: "Data de nascimento",
                          color: NEUTRAL_COLORS.DARK,
                          fs: 12,
                          fw: 400,
                        }}
                      />
                    )
                  }
                  }
                />
              </S.DoubleContainer>
              <Controller
                name="cep"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <InputFormated
                    inputProps={{
                      mask: "00000-000",
                      ph: "04216-000",
                      value: value,
                      onChange: onChange,
                      onBlur: () => trigger('cep'),
                      errorMessage: errors.cep?.message,
                    }}
                    containerProps={{
                      mt: 12,
                    }}
                    labelProps={{
                      value: "CEP",
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
                }
              />
              <Controller
                name="address"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    inputProps={{
                      br: 6,
                      border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                      value: value,
                      onChange: onChange,
                      onBlur: () => trigger('address'),
                      errorMessage: errors.address?.message,
                    }}
                    containerProps={{
                      mt: 18,
                    }}
                    labelProps={{
                      value: "Endereço",
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
                }
              />
              <S.DoubleContainer>
                <Controller
                  name="streetNumber"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      inputProps={{
                        br: 6,
                        border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                        value: value,
                        onChange: onChange,
                        onBlur: () => trigger('streetNumber'),
                        errorMessage: errors.streetNumber?.message,
                      }}
                      containerProps={{
                        mt: 18,
                        width: "50%",
                      }}
                      labelProps={{
                        value: "Número",
                        fs: 12,
                        fw: 400,
                      }}
                    />
                  )
                  }
                />

                <Controller
                  name="complement"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      inputProps={{
                        br: 6,
                        border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                        value: value,
                        onChange: onChange,
                        onBlur: () => trigger('complement'),
                        errorMessage: errors.complement?.message,
                      }}
                      containerProps={{
                        mt: 18,
                        width: "50%",
                      }}
                      labelProps={{
                        value: "Complemento",
                        fs: 12,
                        fw: 400,
                      }}
                    />
                  )
                  }
                />
                <Controller
                  name="neighborhood"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      inputProps={{
                        br: 6,
                        border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                        value: value,
                        onChange: onChange,
                        onBlur: () => trigger('neighborhood'),
                        errorMessage: errors.neighborhood?.message,
                      }}
                      containerProps={{
                        mt: 18,
                        width: "calc(100% + 20px)",
                      }}
                      labelProps={{
                        value: "Bairro",
                        fs: 12,
                        fw: 400,
                      }}
                    />
                  )
                  }
                />

              </S.DoubleContainer>
              <S.LineRadio>
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
                        value: "Estado",
                        fs: 12,
                        fw: 400,
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
                        value: "Cidade",
                        fs: 12,
                        fw: 400,
                        color: NEUTRAL_COLORS.DARK,
                      }}
                    />
                  )
                  }
                />
              </S.LineRadio>
            </>
          )}
          {watch('prosecutorOrRepresentative') === 'REPRESENTANTE_LEGAL' && watch('authPeerThird') && (
            <>
              <Controller
                name="name"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Input
                    inputProps={{
                      br: 6,
                      border: `2px solid ${PRIMARY_COLORS.JEANS_BLUE}`,
                      value: value,
                      onChange: onChange,
                      onBlur: () => trigger('name'),
                      errorMessage: errors.name?.message
                    }}
                    containerProps={{
                      mt: 18,
                    }}
                    labelProps={{
                      value: "Nome",
                      fs: 12,
                      fw: 400,
                    }}
                  />
                )
                }
              />
              <S.DoubleContainer>
                <Controller
                  name="document"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputFormated
                      inputProps={{
                        mask: "000.000.000-00",
                        ph: "123.456.789-00",
                        value: value,
                        onChange: onChange,
                        onBlur: () => trigger('document'),
                        errorMessage: errors.document?.message,
                      }}
                      containerProps={{
                        mt: 12,
                      }}
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
                  name="dateBirth"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <InputFormated
                      inputProps={{
                        maskedValueDate: true,
                        mask: "00/00/0000",
                        ph: "31/01/2000",
                        value: value,
                        onChange: onChange,
                        onBlur: () => trigger('dateBirth'),
                        errorMessage: errors.dateBirth?.message,
                      }}
                      containerProps={{
                        mt: 12,
                      }}
                      labelProps={{
                        value: "Data de nascimento",
                        color: NEUTRAL_COLORS.DARK,
                        fs: 12,
                        fw: 400,
                      }}
                    />
                  )
                  }
                />
              </S.DoubleContainer>
              <div>

              </div>
              <Text
                fs={15}
                fw={400}
                mb={-12}
                color={NEUTRAL_COLORS.DARK}
                mt={12}
                value="Situação legal do cliente"
              />
              <S.RadioLine>
                <S.CheckLine>
                  <RadioButton
                    name="clientType"
                    value={'MENOR_SOB_PATRIO_PODER'}
                    control={control}
                  />
                  <Text
                    value="Menor"
                    fs={15}
                    fw={400}
                    mr={12}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLine>
                <S.CheckLine>
                  <RadioButton
                    name="clientType"
                    value={'MENOR_SOB_TUTELA'}
                    control={control}
                  />
                  <Text
                    value="Emancipado"
                    fs={15}
                    fw={400}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLine>
                <S.CheckLine>
                  <RadioButton
                    name="clientType"
                    value={'FALECIDO_OU_INTERDITO'}
                    control={control}
                  />
                  <Text
                    value="Interdito"
                    fs={15}
                    fw={400}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLine>
                <S.CheckLine>
                  <RadioButton
                    name="clientType"
                    value={'OUTROS'}
                    control={control}
                  />
                  <Text
                    value="Outros"
                    fs={15}
                    fw={400}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLine>

              </S.RadioLine>
              {errors.clientType?.message && <ErrorMessage text={errors.clientType?.message} />}
              <Text
                fs={15}
                fw={400}
                mb={-12}
                color={NEUTRAL_COLORS.DARK}
                mt={12}
                value="Responsável no país"
              />
              <S.RadioLine>
                <S.CheckLine>
                  <RadioButton
                    name="responsibleType"
                    value={'PAI'}
                    control={control}
                  />
                  <Text
                    value="Pai"
                    fs={15}
                    fw={400}
                    mr={12}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLine>
                <S.CheckLine>
                  <RadioButton
                    name="responsibleType"
                    value={'MAE'}
                    control={control}
                  />
                  <Text
                    value="Mãe"
                    fs={15}
                    fw={400}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLine>
                <S.CheckLine>
                  <RadioButton
                    name="responsibleType"
                    value={'TUTOR'}
                    control={control}
                  />
                  <Text
                    value="Tutor"
                    fs={15}
                    fw={400}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLine>
                <S.CheckLine>

                  <RadioButton
                    name="responsibleType"
                    value={'INVENTARIANTE'}
                    control={control}
                  />
                  <Text
                    value="Inventariante"
                    fs={15}
                    fw={400}
                    color={NEUTRAL_COLORS.DARK}
                  />
                </S.CheckLine>
              </S.RadioLine>

            </>
          )}
          {errors.responsibleType?.message && <ErrorMessage text={errors.responsibleType?.message} />}
          <S.ButtonLine>
            <Button
              onClick={() => navigate("/documents")}
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
