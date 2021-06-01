import BaseLayout from '@layouts/base'
import Page from '@layouts/page'
//import Footer from '@layouts/footer'

const main = ({children, onNewNote}) => {
    return (
        <BaseLayout>
            <div className="w-screen h-screen flex">
                <Page>
                {children}
                </Page>
                {/* <Footer /> */}
            </div>
        </BaseLayout>
    )
}

export default main
