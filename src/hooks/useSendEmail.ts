export function useSendEmail() {
  const sendEmail = async (name: string) => {
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  };

  return { sendEmail };
}
