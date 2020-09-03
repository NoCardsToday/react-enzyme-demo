import { createMount, createShallow } from 'enzyme-context';
import { routerContext } from 'enzyme-context-react-router-4';


const plugins = {
    history: routerContext(),
};

const mountWithHistory = createMount(plugins);
const shallowWithHistory = createShallow(plugins);

export { mountWithHistory, shallowWithHistory };
