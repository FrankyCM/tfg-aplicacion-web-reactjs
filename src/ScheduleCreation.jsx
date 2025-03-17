import './Common.css';
import LogoutButton from './LogoutButton';
import './ScheduleCreation.css';
import ScheduleCreationMenuTabs from './ScheduleCreationMenuTabs';

const ScheduleCreation = () => {
    return(
        <>
            <div className="creacion-horarios">
                <div className="creacion-horarios-cerrar-sesion">
                    <LogoutButton color={`#edbeba`} text={`Cerrar sesión`}/>
                </div>
                <div className="creacion-horarios-menu-y-horario">
                    <div className="creacion-horarios-menu">
                        <ScheduleCreationMenuTabs />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ScheduleCreation;