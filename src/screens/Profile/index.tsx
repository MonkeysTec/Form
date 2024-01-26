import { useEffect, useState } from "react";
import { Step } from "../../components/Step";
import { Text } from "../../components/Text";
import { Title } from "../../components/Title";
import { NEUTRAL_COLORS, PRIMARY_COLORS } from "../../constants/styleConstants";
import * as S from "./style";
import { Button } from "../../components/Button/style";
import { useNavigate } from "react-router-dom";
import { ProfileIcon } from "../../assets/icons/profile-icon/Profile";
import { ContainerScreen } from "../../components/ContainerScreen";
import { URL_CONSTANTS, URL_HEADERS } from "../../constants/urlConstants";
import fetchAxios from "../../services/axios";
import SuitStart from "../../assets/icons/suit-start/SuitStart";

interface Alternative {
  alternativeId: number;
  alternativeText: string;
}

interface Question {
  questionId: number;
  questionText: string;
  multiple: boolean;
  alternatives: Alternative[];
}

interface DataSendType {
  questionId: number;
  alternativeIds: number[];
}

export const Profile = () => {
  const [step, setStep] = useState(0);
  const [choose, setChoose] = useState(0);
  const [list, setList] = useState<number[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<DataSendType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {console.log(answer)},[answer])

  const handleBack = (step: number) => {
    answer.pop();
    let count = step - 1;
    setList((list) => []);
    if (count < 0) {
      setStep(0);
      navigate("/answer");
    } else {
      setStep(count);
    }
  };

  const handleForward = (step: number) => {
    if (questions[step-1]?.multiple) {
      const NewAnswer = {
        questionId: questions[step-1].questionId,
        alternativeIds: list
      }
    setAnswer((answer) => [...answer, NewAnswer]);
    } else {
      if (step !== 0) {
        const listChoose = [];
        listChoose.push(choose)
        const NewAnswer = {
          questionId: questions[step-1]?.questionId,
          alternativeIds: listChoose
        }
      setAnswer((answer) => [...answer, NewAnswer]);
      }
    }
    setChoose(0);
    setList((list) => []);
    let count = step + 1;
    if (count > 9) {
      setStep(9);
      handleSendData();
    } else setStep(count);
  };

  const handleArray = (value: number) => {
    if (!list.includes(value)) {
      setList((list) => [...list, value]);
    } else {
      setList(list.filter((item) => item !== value));
    }
  };

  const getQuestions = () => {
    fetchAxios
      .get(`${URL_CONSTANTS.URL_BASE}/suitability/questions?quizId=4`, {
        headers: {
          "Content-Type": URL_HEADERS.CONTENT_TYPE,
          Authorization: URL_HEADERS.AUTHORIZATION,
        },
      })
      .then((response) => {
        console.log(response.data.data[0].questions);
        const quest = response.data.data[0].questions;
        setQuestions(quest);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
      });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleSendData = () => {

    fetchAxios.post('http://www.portal-register.web-dev.futuraonline.com.br/api/suitability/answers?quizId=4', answer,
    {
      headers: {
        'Content-Type': URL_HEADERS.CONTENT_TYPE,
        'Authorization': URL_HEADERS.AUTHORIZATION,
      },
    }
    )
    .then(response => {
      console.log('Resposta da API:', response.data);
      navigate("/finish");
    })
    .catch(error => {
      console.error('Erro ao fazer a solicitação:', error);
    });
  }

  return (
    <ContainerScreen>
      <S.GeneralContainer>
        <S.LeftContainer>
          { loading && 
            <S.FormContainer>
              <S.GeneralText style={{ display: 'flex' }}>
                <Text
                  fs={22}
                  fw={700}
                  mr={8}
                  mt={-4}
                  color={PRIMARY_COLORS.NIGHT_BLUE}
                  value={step === 9 ? "8" : step.toString()}
                />
                de 8
              </S.GeneralText>
              <S.PercentageDiv>
                <S.PercentageFull style={{ width: `${step * 12.5}%` }} />
                <S.PercentageEmpty style={{ width: `${100 - step * 12.5}%` }} />
              </S.PercentageDiv>
              {step === 0 && (
                <S.SuitStartContainer>
                  <SuitStart />
                  <Text
                    fs={20}
                    fw={700}
                    mt={22}
                    value={"Descubra o seu potencial no"}
                  />
                  <Text
                    fs={20}
                    fw={700}
                    mt={4}
                    value={"mundo financeiro agora mesmo!"}
                  />
                  <S.InfoLineStart>
                    <S.GeneralText style={{ display: 'flex', marginTop: '22px', fontSize: "16px", fontWeight: "400", alignItems: 'center', textAlign: 'center' }}>
                      Descubra o seu 
                      <Text
                        fs={16}
                        fw={700}
                        ml={6}
                        mr={6}
                        color={PRIMARY_COLORS.NIGHT_BLUE}
                        pointer
                        value="perfil de investidor, "
                      />
                      a chave para escolher os 
                      {/* <Text
                        fs={16}
                        fw={700}                        
                        ml={6}
                        mr={6}
                        color={PRIMARY_COLORS.NIGHT_BLUE}
                        pointer
                        value="investimentos"
                      /> */}
                    </S.GeneralText>
                    <Text
                        fs={16}
                        fw={700}                        
                        ml={6}
                        mr={6}
                        color={PRIMARY_COLORS.NIGHT_BLUE}
                        pointer
                        value="investimentos perfeitos para você!"
                      />
                  </S.InfoLineStart>
                  <S.InfoLineStart>
                    <S.GeneralText style={{ display: 'flex', marginTop: '22px', fontSize: "16px", fontWeight: "400", alignItems: 'center', textAlign: 'center' }}>
                      Seja 
                      <Text
                        fs={16}
                        fw={700}
                        ml={6}
                        mr={6}
                        color={PRIMARY_COLORS.NIGHT_BLUE}
                        pointer
                        value="Conservador, Moderado ou Agressivo  "
                      />
                      - estamos aqui para
                    </S.GeneralText>
                    <Text
                      fs={16}
                      fw={700}                        
                      ml={6}
                      mr={6}
                      color={PRIMARY_COLORS.NIGHT_BLUE}
                      pointer
                      value="personalizar sua jornada financeira."
                    />
                    <S.GeneralText style={{ display: 'flex', marginTop: '22px', marginBottom: '22px', fontSize: "16px", fontWeight: "400", alignItems: 'center', textAlign: 'center' }}>
                      Não perca tempo, comece a  
                      <Text
                        fs={16}
                        fw={700}
                        ml={6}
                        mr={6}
                        color={PRIMARY_COLORS.NIGHT_BLUE}
                        pointer
                        value="investir com confiança"
                      />
                      hoje mesmo.
                    </S.GeneralText>
                  </S.InfoLineStart>
                </S.SuitStartContainer>
              )}
              {step === 1 && (
                <>
                  <Text
                    fs={20}
                    fw={700}
                    value={questions[step - 1].questionText}
                  />
                  {questions[step - 1].alternatives.map((alternative) => {
                    return (
                      <S.Cards
                        choose={
                          step === 1 && choose === alternative.alternativeId
                        }
                        onClick={() => setChoose(alternative.alternativeId)}
                      >
                        <Text
                          fs={16}
                          fw={400}
                          value={alternative.alternativeText}
                          key={alternative.alternativeId}
                        />
                      </S.Cards>
                    );
                  })}
                </>
              )}
              {step === 2 && (
                <>
                  <Text
                    fs={20}
                    fw={700}
                    value={questions[step - 1].questionText}
                  />
                  {questions[step - 1].alternatives.map((alternative) => {
                    return (
                      <S.Cards
                        choose={
                          step === 2 && list.includes(alternative.alternativeId)
                        }
                        onClick={() => handleArray(alternative.alternativeId)}
                      >
                        <Text
                          fs={16}
                          fw={400}
                          value={alternative.alternativeText}
                          key={alternative.alternativeId}
                        />
                      </S.Cards>
                    );
                  })}
                </>
              )}
              {step === 3 && (
                <>
                  <Text
                    fs={20}
                    fw={700}
                    value={questions[step - 1].questionText}
                  />
                  {questions[step - 1].alternatives.map((alternative) => {
                    return (
                      <S.Cards
                        choose={
                          step === 3 && choose === alternative.alternativeId
                        }
                        onClick={() => setChoose(alternative.alternativeId)}
                      >
                        <Text
                          fs={16}
                          fw={400}
                          value={alternative.alternativeText}
                          key={alternative.alternativeId}
                        />
                      </S.Cards>
                    );
                  })}
                </>
              )}
              {step === 4 && (
                <>
                  <Text
                    fs={20}
                    fw={700}
                    value={questions[step - 1].questionText}
                  />
                  {questions[step - 1].alternatives.map((alternative) => {
                    return (
                      <S.Cards
                        choose={
                          step === 4 && choose === alternative.alternativeId
                        }
                        onClick={() => setChoose(alternative.alternativeId)}
                      >
                        <Text
                          fs={16}
                          fw={400}
                          value={alternative.alternativeText}
                          key={alternative.alternativeId}
                        />
                      </S.Cards>
                    );
                  })}
                </>
              )}
              {step === 5 && (
                <>
                  <Text
                    fs={20}
                    fw={700}
                    value={questions[step - 1].questionText}
                  />
                  {questions[step - 1].alternatives.map((alternative) => {
                    return (
                      <S.Cards
                        choose={
                          step === 5 && choose === alternative.alternativeId
                        }
                        onClick={() => setChoose(alternative.alternativeId)}
                      >
                        <Text
                          fs={16}
                          fw={400}
                          value={alternative.alternativeText}
                          key={alternative.alternativeId}
                        />
                      </S.Cards>
                    );
                  })}
                </>
              )}
              {step === 6 && (
                <>
                  <Text
                    fs={20}
                    fw={700}
                    value={questions[step - 1].questionText}
                  />
                  {questions[step - 1].alternatives.map((alternative) => {
                    return (
                      <S.Cards
                        choose={
                          step === 6 && choose === alternative.alternativeId
                        }
                        onClick={() => setChoose(alternative.alternativeId)}
                      >
                        <Text
                          fs={16}
                          fw={400}
                          value={alternative.alternativeText}
                          key={alternative.alternativeId}
                        />
                      </S.Cards>
                    );
                  })}
                </>
              )}
              {step === 7 && (
                <>
                  <Text
                    fs={20}
                    fw={700}
                    value={questions[step - 1].questionText}
                  />
                  {questions[step - 1].alternatives.map((alternative) => {
                    return (
                      <S.Cards
                        choose={
                          step === 7 && choose === alternative.alternativeId
                        }
                        onClick={() => setChoose(alternative.alternativeId)}
                      >
                        <Text
                          fs={16}
                          fw={400}
                          value={alternative.alternativeText}
                          key={alternative.alternativeId}
                        />
                      </S.Cards>
                    );
                  })}
                </>
              )}
              {step === 8 && (
                <>
                  <Text
                    fs={20}
                    fw={700}
                    value={questions[step - 1].questionText}
                  />
                  {questions[step - 1].alternatives.map((alternative) => {
                    return (
                      <S.Cards
                        choose={
                          step === 8 && choose === alternative.alternativeId
                        }
                        onClick={() => setChoose(alternative.alternativeId)}
                      >
                        <Text
                          fs={16}
                          fw={400}
                          value={alternative.alternativeText}
                          key={alternative.alternativeId}
                        />
                      </S.Cards>
                    );
                  })}
                </>
              )}
              {step === 9 && (
                <S.Answer>
                  <Title fs={24} fw={600} mb={30} value="Seu perfil é:" />
                  <ProfileIcon size={70} color={PRIMARY_COLORS.NIGHT_BLUE} />
                  <Text fs={24} fw={400} mt={30} mb={40} value="Moderado" />
                  <S.GeneralText style={{ fontSize: "16px" }}>
                    O investidor{" "}
                    <Text
                      fs={16}
                      fw={700}
                      color={PRIMARY_COLORS.NIGHT_BLUE}
                      value="Moderado"
                    />{" "}
                    busca um equilíbrio entre segurança e crescimento, aceitando
                    um pouco mais de risco em busca de retornos maiores. Ele
                    diversifica sua carteira com ações, títulos de renda fixa e
                    fundos de investimento, protegendo seu capital.
                  </S.GeneralText>
                </S.Answer>
              )}
              <S.ButtonLine>
                <Button
                  onClick={() => handleBack(step)}
                  values={{
                    fs: 15,
                    fw: 600,
                    color: NEUTRAL_COLORS.GRAY,
                    border: `2px solid ${NEUTRAL_COLORS.GRAY}`,
                    width: 170,
                  }}
                >
                  Voltar
                </Button>
                <Button
                  onClick={() => handleForward(step)}
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
            </S.FormContainer>
          }
        </S.LeftContainer>
        <S.RightContainer>
          <Step step={5} />
          <S.CardContainer>
            <Text
              fs={25}
              fw={700}
              color={NEUTRAL_COLORS.WHITE}
              value="Qual o meu perfil e"
            />
            <Text
              fs={25}
              fw={700}
              mt={4}
              color={"#AACBDE"}
              value="para que ele serve?"
            />
            <Text
              fs={16}
              fw={500}
              mt={16}
              color={NEUTRAL_COLORS.WHITE}
              value={ step === 0 ? "Para garantir sua segurança. Além disso, é importante que você tenha um acompanhamento próximo dos seus investimentos, recebendo informações úteis e atualizadas de nossas melhores condições. O perfil do investidor é uma ferramenta que ajuda a determinar qual é o tipo de investimento mais adequado para você, levando em consideração seu perfil de risco, objetivos financeiros e tolerância a perdas. Ele é importante porque cada pessoa tem diferentes preferências e níveis de conforto quando se trata de investimentos. Você será enquadrado em 1 de 3 perfis (Conservador, Moderado ou Agressivo)." : "O perfil de investidor define o tipo de investimento ideal para você, baseado em seu risco, objetivos e tolerância a perdas, classificando-o como Conservador, Moderado, Arrojado ou Agressivo."}
            />
          </S.CardContainer>
        </S.RightContainer>
      </S.GeneralContainer>
    </ContainerScreen>
  );
};
