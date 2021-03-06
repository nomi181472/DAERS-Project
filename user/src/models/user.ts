import { UserSchema, UserAttrs } from "./user-repo/user-repo";



export class User {
  constructor() { }
  public async addUser(_user: UserAttrs) {
    try {
      const user = UserSchema.build(_user);
      await user.save();

      return user;
    } catch (err) {
      console.log("ErrorPosition:addUser", err);
      return null;
    }
  }
  
  public async addUserInformation(object:any,userId:string) {
    try {
      const userDocument =await  UserSchema.findById(userId);
      if (userDocument && userDocument.userInformation!==undefined)  {
        const userObjectKeys = Object.keys(userDocument.userInformation);
        
        
       
    const  sameKeys=(key:any,ind:any) =>{
    
      if (userDocument.userInformation !== undefined)
      {
      
      
          userDocument.userInformation[key] = object[key];
        
        
      }
        

        }
        Object.keys(object).forEach(sameKeys) 
       
        userDocument.markModified("userInformation")
        await userDocument.save();

      }
    else
      {
     

      }

    }
    catch (err) {
      console.log(err);
    }
  }
  public async updateUser(_user: UserAttrs, userId: String) {
    try {
      const user = await UserSchema.findById(userId);
      //console.log(user);
      if (!user) {
        return "id-notfound";
      }
      user.set(_user);

      await user.save();
      return user;
    } catch (err) {
      console.log("ErrorPosition:updateExercise", err);
      return null;
    }
  }
  public async deleteUser(userId: String) {
    try {
      const ex = await UserSchema.findById(userId);
      if (!ex) {
        return "id-notfound";
      }
      const { n, ok, deletedCount } = await UserSchema.deleteOne({
        _id: userId,
      });

      return true;
    } catch (err) {
      console.log("ErrorPosition:deleteUser", err);
      return null;
    }
  }

  
  public async detailUser(userId: String) {
    try {
      const user = await UserSchema.findById(userId);
      if (!user) {
        return "id-notfound";
      }

      return user;
    } catch (err) {
      console.log("ErrorPosition:detailUser", err);
      return null;
    }
  }
  public async listUser(query: any) {
    let user:any;
    try {
      
      const page= query.page||1
    const  perPage = parseInt(page) || 10
    
    var pagination = {
      limit: perPage ,
      skip:perPage * (page - 1)
    }
    
  
      
      
      user = await UserSchema.find({})
         
      
      if (!user) {
        return "empty";
      }

      return user;
    } catch (err) {
      console.log("ErrorPosition:listUser", err);
      return null;
    }
  }
}
