import React, { useEffect } from 'react';
import { ContainerHubSpotForm } from './styles';
import { useUserProvider } from '../../context/useLoginContext';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../../context/useSessionStorage';

interface HubSpotFormProps {
    formId: string;
    portalId: string;
    region: string;
}

const HubSpotForm = ({ formId, portalId, region }: HubSpotFormProps) => {

    const { setEmail, setName, setPhone } = useUserProvider();

    const navigate = useNavigate();

    const { saveToSessionStorage } = useSessionStorage();

    useEffect(() => {
        // Cria a tag de script
        const script = document.createElement('script');
        script.src = "//js.hsforms.net/forms/embed/v2.js";
        script.charset = 'utf-8';
        script.type = 'text/javascript';
        document.body.appendChild(script);

        // Carrega o formulário quando o script estiver pronto
        script.addEventListener('load', () => {
            if (window.hbspt) {
                window.hbspt.forms.create({
                    region,
                    portalId,
                    formId,
                    target: '#hubspotForm',
                    onFormSubmitted: (forms: any, data: any) => {
                        saveToSessionStorage('hubspotFormData', data)
                    },
                    redirectUrl: '/home',
                });
            }
        });

        // Limpeza
        return () => {
            document.body.removeChild(script);
        };
    }, [formId, portalId]);

    return <ContainerHubSpotForm id="hubspotForm"></ContainerHubSpotForm>;
};

export default HubSpotForm;
