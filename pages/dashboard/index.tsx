import Head from "next/head"
import Layout from "@/components/layout/Layout"
import DashboardPage from "@/components/templates/DashboardPage/DashboardPage"

function Dashboard() {
  return (
    <>
      <Head>
        <title>Nasty_Ku_toys</title>
        <meta name="description" content="Online shop knitting toys" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <DashboardPage />
          <div className="overlay"/>
        </main>
      </Layout>
    </>
  )
}

export default Dashboard
