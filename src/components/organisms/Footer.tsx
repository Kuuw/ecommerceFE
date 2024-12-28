import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export function FooterComponent() {
    return (
        <Footer container className="sticky top-[100vh] mt-10 p-8 bg-gray-200 dark:bg-slate-950">
            <FooterCopyright href="#" by=" Zuwu.dev" year={2024} className="mr-3" />
            <FooterLinkGroup>
                <FooterLink href="#" className="mr-3">About</FooterLink>
                <FooterLink href="#" className="mr-3">Privacy Policy</FooterLink>
                <FooterLink href="#" className="mr-3">Licensing</FooterLink>
                <FooterLink href="#" className="mr-3">Contact</FooterLink>
            </FooterLinkGroup>
        </Footer>
    );
}