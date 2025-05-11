"use client";

type EmailTemplateProps = {
  firstName: string;
};

export function EmailTemplate({ firstName }: Readonly<EmailTemplateProps>) {
  return (
    <div className="p-4 bg-white text-gray-600">
      <h1 className="text-2xl font-bold text-purple-600 mb-4">
        Bonjour, {firstName}!
      </h1>
      <p>Voici un test pour l'envoie d'email pour notifier les parents.</p>
    </div>
  );
}
