import { Link, useLocation } from "react-router-dom";

export const Navigation: React.FC = () => {
	const location = useLocation();

	return (
		<div>
			{[{ name: "Выйти", path: "/logout" }].map(({ name, path }) => (
				<Link to={path} key={path}>
					<button type='button' style={{ background: path === location.pathname ? "blue" : undefined }}>
						{name}
					</button>
				</Link>
			))}
		</div>
	);
};
