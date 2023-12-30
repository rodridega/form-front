import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export const MainLayout: FC<Props> = ({ children }) => {
    return (
        <main className=' p-4 lg:p-8 bg-vivvi'>
            {children}
        </main>
    )
}
