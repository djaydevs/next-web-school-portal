import { Montserrat, Poppins } from 'next/font/google'
 
export const montserrat = Montserrat({
    subsets: ["latin"],
    display: "swap",
});
 
export const poppins = Poppins({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin'],
    display: 'swap',
})