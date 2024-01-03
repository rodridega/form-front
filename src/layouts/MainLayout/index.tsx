import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export const MainLayout: FC<Props> = ({ children }) => {
    return (
        <main className='min-h-screen p-4 lg:p-8 bg-vivvi'>
            {children}
        </main>
    )
}
