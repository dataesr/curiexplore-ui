import { createContext, useContext } from 'react';

export const GraphContext = createContext({});

const useGraphContext = () => useContext(GraphContext);

export default useGraphContext;
