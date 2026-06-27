
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

const cookieExtractor = (req: any) => {
    return req?.cookies?.access_token || null;
};

@Injectable()
export default class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            ignoreExpiration: false,
            secretOrKey: process.env.ACCESS_TOKEN_SECRET,
        });
    }

    async validate(payload: any) {
        return { userId: payload.id, email: payload.email };
    }
}
