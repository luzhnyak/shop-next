import * as yup from "yup";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const useQuizCreateSchema = () => {
  const t = useTranslations("quiz");

  const schema = useMemo(
    () =>
      yup.object({
        title: yup.string().required(t("nameRequired")),
        description: yup.string().required(t("descriptionRequired")),
        frequency: yup.number().required(t("frequencyRequired")),
        questions: yup
          .array()
          .of(
            yup.object({
              title: yup.string().required(t("questionRequiredTitle")),
              answer_options: yup
                .array()
                .of(
                  yup.object({
                    text: yup.string().required(t("answerOptionRequired")),
                    is_correct: yup
                      .boolean()
                      .required(t("correctAnswerRequired")),
                  })
                )
                .required()
                .min(2, t("minAnswerOptions"))
                .test(
                  "one-correct",
                  t("correctAnswerRequired"),
                  (answers) => answers?.some((a) => a.is_correct) ?? false
                ),
            })
          )
          .min(2, t("minQuestions"))
          .required(t("questionsRequired")),
      }),
    [t]
  );

  return schema;
};

export const useQuizUpdateSchema = () => {
  const t = useTranslations("quiz");

  const schema = useMemo(
    () =>
      yup.object({
        title: yup.string().required(t("nameRequired")),
        description: yup.string().required(t("descriptionRequired")),
        frequency: yup.number().required(t("frequencyRequired")),
      }),
    [t]
  );

  return schema;
};

export const useQuestionCreateSchema = () => {
  const t = useTranslations("quiz");

  const schema = useMemo(
    () =>
      yup.object({
        title: yup.string().required(t("questionRequiredTitle")),
        answer_options: yup
          .array()
          .of(
            yup.object({
              text: yup.string().required(t("answerOptionRequired")),
              is_correct: yup.boolean().required(t("correctAnswerRequired")),
            })
          )
          .required()
          .min(2, t("minAnswerOptions"))
          .test("at-least-one-correct", t("correctAnswerRequired"), (answers) =>
            answers ? answers.some((a) => a.is_correct) : false
          ),
      }),
    [t]
  );

  return schema;
};
