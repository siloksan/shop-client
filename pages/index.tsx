import Head from "next/head"
import AuthPage from "@/components/templates/AuthPage/AuthPage"
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck"

function Auth() {
  const { shouldLoadContent } = useRedirectByUserCheck(true)

  return (
    <>
      <Head>
        <title>Nasty_Ku_toys | {shouldLoadContent ? 'Авторизация' : ''}</title>
        <meta name="description" content="Online shop knitting toys" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      {shouldLoadContent && <AuthPage />}
    </>
  )
}

export default Auth
