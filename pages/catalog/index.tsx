import Head from "next/head"
import Layout from "@/components/layout/Layout"
import useRedirectByUserCheck from "@/hooks/useRedirectByUserCheck"
import CatalogPage from "@/components/templates/CatalogPage/CatalogPage"
import { IQueryParams } from "@/types/catalog"

function Catalog({ query }: { query: IQueryParams }) {
  const { shouldLoadContent } = useRedirectByUserCheck()

  return (
    <>
      <Head>
        <title>Nasty_Ku_toys | {shouldLoadContent ? 'Каталог' : ''}</title>
        <meta name="description" content="Online shop knitting toys" />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE-edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/img/favicon.ico" />
      </Head>
      {shouldLoadContent && (
        <Layout>
          <main>
            <CatalogPage query={query}/>
            <div className="overlay"/>
          </main>
        </Layout>
      )}
    </>
  )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
  return {
    props: { query: { ...context.query }}
  }
}

export default Catalog
