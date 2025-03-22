import { Header } from "../components/Header"
type Props = {
    children: React.ReactNode
}
export const Layout = ({
    children
}: Props) => {
    return (
        <div className="bg-gray-300 min-h-screen flex flex-col items-center gap-5">
            <Header/>
            <div className="w-5/6 bg-gray-400 min-h-screen flex justify-center shadow h-full rounded">
                {children}
            </div>
        </div>
    )
}
