import "./../assets/styles/toggle.css"

const Toggle = ({ id, toggleChange }) => {
    return (
        <label className="switch">
          <input type="checkbox" id={id} onChange={e=>toggleChange(e)} defaultChecked={true} />
          <span className="toggle round"></span>
        </label>
    );
}


export default Toggle;