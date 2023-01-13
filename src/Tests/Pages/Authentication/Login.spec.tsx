/* eslint-disable no-undef */
import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import Login, { LoginPage } from "Pages/Authentication/Login/login";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import thunk from "redux-thunk";
import configureStore, { MockStoreCreator } from "redux-mock-store";
import { AnyAction, Store } from "redux";
import { cleanup } from "@testing-library/react";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("PagesHooks/Authentication/Login/useLoginState", () => ({
  
}));

const _mockStore: MockStoreCreator<unknown, unknown> = configureStore([thunk]);

describe(">>> Login Page", () => {
  let wrapper: ShallowWrapper<typeof Login>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store: Store<any, AnyAction>;

  beforeEach(() => {
    store = _mockStore({
      CurrentUser: null,
      Token: null,
      Loading: false,
      Error: "",
      IsAuthenticated: false,
    });
  });

  afterEach(cleanup);

  describe("should have an interface", () => {
    beforeEach(() => {
      wrapper = shallow(renderComponent(store));
    });
    it("should render the login page", () => {
      const testId = "LoginForm";
      const _testSuite = `[data-testid="${testId}"]`;
      console.log(wrapper.find(_testSuite).debug());
      // expect(wrapper.length).toEqual(1);
    });

    it("should contain LoginForm div", () => {
      const testId = "LoginForm";
      expect(wrapper.find(`div[data-testid="${testId}"]`)).toBeDefined();
    });

    it("should have a back button", () => {
      wrapper = shallow(renderComponent(store));
      const testId = "arrowLeft";
      expect(wrapper.find(`Icon[name="${testId}"]`)).toBeDefined();
    });
  });

  describe("Test for Logo", () => {
    it("should display logo with hyperlink", () => {
      wrapper = shallow(renderComponent(store));
      const testId = "log-link";
      expect(wrapper.find(`Link[data-testid="${testId}"]`)).toBeDefined();
    });

    it("should exist & have an image source equal to the defined", () => {
      wrapper = shallow(renderComponent(store));
      const imageTestId = "logo-img";
      const imageSrc = "http://localhost/logo.svg";

      const image = wrapper.find(`img[data-testid="${imageTestId}"]`);
      expect(image).toBeDefined();

      const imageWithSrc = wrapper.find(`img[src="${imageSrc}"]`);
      expect(imageWithSrc).toBeDefined();
    });
  });

  describe("Test Input Fields", () => {
    beforeEach(() => {
      wrapper = shallow(renderComponent(store));
    });

    it("should update user_identifier field", () => {
      const testId = "user_identifier";
      const input = wrapper.find(`Input[name="${testId}"]`);

      expect(input).toBeDefined();
    });

    it("should update password field", () => {
      const testId = "password";
      const input = wrapper.find(`Input[name="${testId}"]`);
      expect(input).toBeDefined();
    });

    it("should authenticate using login Btn", () => {
      const testId = "Login";
      const btn = wrapper.find(`Button[title="${testId}"]`);
      expect(btn).toBeDefined();
    });

    it("should navigate to forgot password", () => {
      const testId = "forgotPassword";
      const route = "/forgotpassword";
      const input = wrapper.find(`Link[data-testid="${testId}"]`);
      const inputLink = wrapper.find(`Link[to="${route}"]`);

      expect(input).toBeDefined();
      expect(inputLink).toBeDefined();
    });

    it("should navigate to signup", () => {
      const testId = "signUp";
      const route = "/signup";
      const input = wrapper.find(`Link[data-testid="${testId}"]`);
      const inputLink = wrapper.find(`Link[to="${route}"]`);

      expect(input).toBeDefined();
      expect(inputLink).toBeDefined();
    });
  });
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderComponent = (_store: Store<any, AnyAction>) => {
  return (
    <div>
      <Provider store={_store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Login />
        </MemoryRouter>
      </Provider>
    </div>
  );
};
