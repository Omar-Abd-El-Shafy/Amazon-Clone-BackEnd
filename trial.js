const conn = require("../models/connection"); 
const User = require("../models/user.model");
const ShippingAddress = require("../models/address.model");

const register = async () => {

    try {
        const session = await conn.startSession();                                   
        await session.withTransaction(async () => { 
    
            const user = await User.create([
                { 
                    name: 'Van Helsing' 
                }
            ], { session });
    
            await ShippingAddress.create([
                {
                    address: 'Transylvania',
                    user_id: user.id
                }
            ], { session });
    
            return user;
        });
        session.endSession();

        console.log('success');
    } catch (error) {
        console.log('error');
    }
}