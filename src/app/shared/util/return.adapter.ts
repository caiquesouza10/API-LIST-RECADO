import { Result } from "../contracts/result.contract";

export class Return {
    public static invalidCredentials(): Result {
        return {
            ok: false,
            message: "Acesso não autorizado",
            code: 401
        };
    }

    public static successLogin(message: string, data: any): Result {
        return {
            ok: true,
            message,
            data,
            code: 200
        };
    }

    public static success(message: string, data: any) {
        return {
            ok: true,
            message,
            data,
            code:200
        };
    }

    public static notFound(entity: string) {
        return {
            ok: false,
            message: entity + " not found.",
            code: 404
        };
    }

    public static existe(entity: string) {
        return{
            ok: false,
            message: entity + " Já existe favor criar outro",
            code: 400
        };
    }
}