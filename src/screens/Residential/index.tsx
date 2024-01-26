import { useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Select } from "../../components/Select";
import { Step } from "../../components/Step";
import { Text } from "../../components/Text";
import { Title } from "../../components/Title";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import * as S from "./style";
import { Button } from "../../components/Button/style";
import { useNavigate } from "react-router-dom";
import { ContainerScreen } from "../../components/ContainerScreen";
import fetchAxios from "../../services/axios";
import { URL_CONSTANTS, URL_HEADERS } from "../../constants/urlConstants";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputFormated } from "../../components/InputFormated";

interface SendDataType {
  address: AddressType,
}

interface AddressType {
  zipCode: string,
  addressName: string,
  number: number,
  complement: string,
  neighborhood: string,
  city: string,
  state: string,
}

export const residentialDataInfoSchema = z.object({
  cep: z.string({ required_error: 'CEP é obrigatório' }).min(1, { message: 'CEP é obrigatório' }),
  address: z.string({ required_error: 'Endereço é obrigatório' }).min(8, { message: 'Endereço é obrigatório' }),
  streetNumber: z.string({ required_error: 'Número é obrigatório' }).min(1, { message: 'Número é obrigatório' }),
  complement: z.string({ required_error: 'Complemento é obrigatório' }).min(1, { message: 'Complemento é obrigatório' }),
  neighborhood: z.string({ required_error: 'Bairro é obrigatório' }).min(1, { message: 'Bairro é obrigatório' }),
  city: z.string({ required_error: 'Cidade é obrigatório' }).min(1, { message: 'Cidade é obrigatório' }),
  state: z.string({ required_error: 'Estado é obrigatório' }).min(1, { message: 'Estado é obrigatório' }),
}).superRefine((data, ctx) => {

});

type FormData = z.infer<typeof residentialDataInfoSchema>;

export const Residential = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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
    resolver: zodResolver(residentialDataInfoSchema),
  });

  const breakpointSmall = window.matchMedia("(max-width: 500px)");

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
        const staties = response.data.data.map((stt: { stateCode: any }) => stt.stateCode);
        setStates(staties);
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
  };

  const getCities = (selectedState: string) => {
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

  useEffect(() => {
    getState();
  }, []);

  useEffect(() => {
    getCities(watch('state'));
  }, [watch('state')]);

  const sendDataRequest = (data: FormData) => {
    const selectedData: SendDataType = {
      address: {
        zipCode: data.cep,
        addressName: data.address,
        number: data.streetNumber ? Number(data.streetNumber) : 0,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      }
    }
    console.log('selectedData', selectedData)
    fetchAxios.post('http://www.portal-register.web-dev.futuraonline.com.br/api/register/address/1/1', selectedData,
      {
        headers: {
          'Content-Type': URL_HEADERS.CONTENT_TYPE,
          'Authorization': URL_HEADERS.AUTHORIZATION,
        },
      }
    )
      .then(response => {
        console.log('Resposta da API:', response.data);
        navigate("/bankers")
      })
      .catch(error => {
        console.error('Erro ao fazer a solicitação:', error);
      });
  }

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
    if (watch('cep') && watch('cep').length >= 8) {
      getCep();
    }
  }, [watch('cep')])

  return (
    <ContainerScreen>
      <S.GeneralContainer>
        <S.LeftContainer>
          <Title
            fs={40}
            fw={600}
            color={PRIMARY_COLORS.NIGHT_BLUE}
            value="Dados residenciais"
          />
          <Text
            fs={20}
            fw={400}
            color={NEUTRAL_COLORS.DARK}
            mt={22}
            value="Já estamos próximos do final. Por favor, informe seus dados residenciais."
          />
           <Controller
              name="cep"
              control={control}
              render={({ field: { onChange, value } }) => (
                <InputFormated
                  inputProps={{
                    mask: "00000-000",
                    ph: "Cep",
                    value: value,
                    onChange: onChange,
                    errorMessage: errors.cep?.message
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
                  errorMessage: errors.address?.message
                }}
                containerProps={{
                  mt: 12,
                }}
                labelProps={{
                  value: "Endereço",
                  fs: 14,
                  fw: 500,
                }}
              />
            )
            }
          />
          <S.LineRadio>
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
                    errorMessage: errors.streetNumber?.message
                  }}
                  containerProps={{
                    mt: 12,
                    width: breakpointSmall.matches ? '100%' : "30%",
                  }}
                  labelProps={{
                    value: "Número",
                    fs: 14,
                    fw: 500,
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
                    errorMessage: errors.complement?.message
                  }}
                  containerProps={{
                    mt: 12,
                    width: breakpointSmall.matches ? '100%' : "30%",
                  }}
                  labelProps={{
                    value: "Complemento",
                    fs: 14,
                    fw: 500,
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
                    errorMessage: errors.neighborhood?.message
                  }}
                  containerProps={{
                    mt: 12,
                    width: breakpointSmall.matches ? '100%' : "63%",
                  }}
                  labelProps={{
                    value: "Bairro",
                    fs: 14,
                    fw: 500,
                  }}
                />
              )
              }
            />
          </S.LineRadio>
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
                    fs: 14,
                    fw: 500,
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
                    fs: 14,
                    fw: 500,
                    color: NEUTRAL_COLORS.DARK,
                  }}
                />
              )
              }
            />
          </S.LineRadio>
          <S.ButtonLine>
            <Button
              onClick={() => navigate("/declarations")}
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
              onClick={handleSubmit(sendDataRequest)}
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
          <Step step={2} />
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
              value="dados residenciais?"
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
    </ContainerScreen>
  );
};
