interface Props {
    clicked?: () => void;
}

const NavLink: React.FC<Props> = (props) => (
    <li>
        <button className="transition-border duration-300 border-4 border-transparent hover:bg-grey-lighter
        py-4 px-3 lg:px-5 lg:mx-3 w-full lg:w-auto text-lg font-medium text-syntax-yellow-darker focus:outline-none"
            onClick={props.clicked}
        >
            {props.children}
        </button>
    </li>
)

export default NavLink;