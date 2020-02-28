import { IsString } from 'class-validator';

class UserLoginDTO {
    
    @IsString()
    public name: string;
    
    @IsString()
    public email: string;

    @IsString()
    public password: string;
}

export default UserLoginDTO;
