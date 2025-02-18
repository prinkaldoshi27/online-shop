import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
         <div
            className=' h-screen items-center justify-center'
         >   <h1 className="text-6xl font-bold text-red-500">404</h1>
            <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
            <p className="mt-2 text-gray-600">Oops! The page you are looking for does not exist.</p>
            <Button
                label="Go Home"
                icon="pi pi-home"
                className="mt-6 p-button-rounded p-button-primary"
                onClick={() => navigate('/')}
            />
        </div>
    );
};

export default PageNotFound;