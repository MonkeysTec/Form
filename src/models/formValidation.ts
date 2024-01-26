import { z } from "zod";

export const declarationInfoSchema = z.object({
    authPeerThird: z.boolean(),
    isPoliticallyExposed: z.boolean(),
    justifications: z.string().optional(),
    document: z.string({ required_error: 'Digite o seu documento' }).min(1, { message: 'Digite o seu documento' }).optional(),
    cpf: z.string({ required_error: 'Digite o nome do co-titular' }).trim().optional(),
    dateBirth: z.string({ required_error: 'Digite sua data de nascimento' }).min(1, { message: 'Digite a data de expedição' }).optional(),
    numberSecurity: z.string().optional(),
    cep: z.string().optional(),
    address: z.string().optional(),
    streetNumber: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    name: z.string().optional(),
    clientType: z.enum(['OUTROS', 'FALECIDO_OU_INTERDITO', 'MENOR_SOB_TUTELA', 'MENOR_SOB_PATRIO_PODER'], { required_error: 'Selecione o tipo de documento' }).optional(),
    responsibleType: z.enum(['PAI', 'MAE', 'TUTOR', 'INVENTARIANTE'], { required_error: 'Escolha o responsável no país' }).optional(),
    prosecutorOrRepresentative: z.enum(['PROCURADOR', 'REPRESENTANTE_LEGAL']).optional(),
  }).superRefine((data, ctx) => {
    if(data.isPoliticallyExposed === true) {
      if(!data.justifications || data.justifications.trim().length === 0) {
        ctx.addIssue({
            path: ['justifications'],
            message: 'Digite as justificativas',
            code: 'custom'
        });
      }
    }
    if (data.authPeerThird === true) {
        if(!data.prosecutorOrRepresentative) {
            ctx.addIssue({
                path: ['prosecutorOrRepresentative'],
                message: 'Selecione algum dos campos',
                code: 'custom'
            });
        }

      if (data.prosecutorOrRepresentative === 'PROCURADOR' || data.prosecutorOrRepresentative === 'REPRESENTANTE_LEGAL') {
        if (!data.name || data.name.trim().length === 0) {
          ctx.addIssue({
            path: ['name'],
            message: 'Digite o nome ',
            code: 'custom'
          });
        }
        if (!data.dateBirth || data.dateBirth.trim().length === 0) {
          ctx.addIssue({
            path: ['dateBirth'],
            message: 'Digite sua data de nascimento',
            code: 'custom'
          });
        }
      }
      if (data.prosecutorOrRepresentative === 'PROCURADOR') {
        if (!data.address || data.address.trim().length === 0) {
          ctx.addIssue({
            path: ['address'],
            message: 'Digite seu endereço',
            code: 'custom'
          });
        }
        if (!data.document || data.document.trim().length === 0) {
          ctx.addIssue({
            path: ['document'],
            message: 'Digite o seu documento',
            code: 'custom'
          });
        }
        if (!data.cep || data.cep.trim().length === 0) {
          ctx.addIssue({
            path: ['cep'],
            message: 'Digite seu CEP',
            code: 'custom'
          });
        }
        if (!data.streetNumber || data.streetNumber.trim().length === 0) {
          ctx.addIssue({
            path: ['streetNumber'],
            message: 'Digite o número da sua residência',
            code: 'custom'
          });
        }
        if (!data.complement || data.complement.trim().length === 0) {
          ctx.addIssue({
            path: ['complement'],
            message: 'Digite o complemento do seu endereço',
            code: 'custom'
          });
        }
        if (!data.neighborhood || data.neighborhood.trim().length === 0) {
          ctx.addIssue({
            path: ['neighborhood'],
            message: 'Digite o bairro do seu endereço',
            code: 'custom'
          });
        }
        if (!data.city || data.city.trim().length === 0) {
          ctx.addIssue({
            path: ['city'],
            message: 'Digite a cidade do seu endereço',
            code: 'custom'
          });
        }
        if (!data.state || data.state.trim().length === 0) {
          ctx.addIssue({
            path: ['state'],
            message: 'Digite o estado do seu endereço',
            code: 'custom'
          });
        }
      }


    }
    if (data.prosecutorOrRepresentative === 'REPRESENTANTE_LEGAL') {
      if(!data.clientType || data.clientType.trim().length === 0) {
        ctx.addIssue({
            path: ['clientType'],
            message: 'Selecione a situação do cliente',
            code: 'custom'
        });
      }
      if (!data.responsibleType || data.responsibleType.trim().length === 0) {
        ctx.addIssue({
          path: ['responsibleType'],
          message: 'Escolha o responsável no país',
          code: 'custom'
        });
      }
      if (!data.document || data.document.trim().length === 0) {
        ctx.addIssue({
          path: ['document'],
          message: 'Digite o seu documento',
          code: 'custom'
        });
      }
    }
  });