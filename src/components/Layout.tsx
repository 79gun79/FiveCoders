import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="min-w-screen min-h-[80px] bg-[var(--color-main)]">
                상단 바 {/* 나중에 Topbar 컴포넌트로 교체 */}
            </header>

            <div className="flex flex-1">
                <Sidebar />
                <main className="w-auto mt-[50px] mx-[160px]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}