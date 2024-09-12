import '@testing-library/jest-dom';


import {beforeAll, vi} from "vitest";
import {addMock_1} from "./tests/test_utils";


beforeAll(() => {
    addMock_1(vi);
})

