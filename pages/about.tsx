import AboutHero from "@/components/ui/about-hero"
import { ContactSection } from "@/components/ui/component-section"
import TheTeam from "@/components/ui/the-team"

export default function About() {
	return (
		<>
			<AboutHero />
			<TheTeam />
			<ContactSection
				title="Contact Us"
				CompanyTitle="Company Name"
				NumberOfEmployeesTitle="Number of Employees"
				buttonLabel="Contact Us"
				emailTitle="Email"
				nameTitle="Name"
				phoneTitle="Phone"
			/>
		</>
	)
}
