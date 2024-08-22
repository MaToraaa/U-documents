import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

const Header = ({children, className} : HeaderProps) => {
  return (
    <div className={cn('header', className)}>
        <Link className="md:flex-1" href={'/'}>
        <Image className="hidden md:block" src={'/assets/icons/logo.svg'} alt="logo" width={120} height={32}/>
        <Image className="mr-2 md:hidden" src={'/assets/icons/logo-icon.svg'} alt="logo" width={32} height={32}/>
        </Link>
        {children}
    </div>
  )
}

export default Header