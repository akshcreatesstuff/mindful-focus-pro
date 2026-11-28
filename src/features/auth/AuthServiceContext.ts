import { createContext } from "react";
import type { AuthService } from "./types";

// null means authentication has not been configured
export const AuthServiceContext = createContext<AuthService | null>(null);
