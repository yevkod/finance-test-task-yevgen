import { render } from "@testing-library/react";
import {Header} from "./Header";

describe("<Header /> component", () => {
    it("should match snapshot", () => {
        const { container } = render(<Header />);
        expect(container).toMatchSnapshot();
    });
});
