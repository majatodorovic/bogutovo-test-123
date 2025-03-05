import ResetPasswordComponent from "@/_components/ResetPasswordComponent/ResetPasswordComponent";

const ResetPassword = ({params:{token}}) => {


   
    return (
        <div>
            <ResetPasswordComponent token={token}/>
        </div>
    )
}

export default ResetPassword;