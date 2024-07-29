import { cn } from "@/lib/utils"
import React, {
	createContext,
	useState,
	useContext,
	useRef,
	useEffect
} from "react"

const MouseEnterContext = createContext<
	[boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined)

export const CardContainer = ({
	children,
	className,
	containerClassName
}: {
	children?: React.ReactNode
	className?: string
	containerClassName?: string
}) => {
	const containerRef = useRef<HTMLDivElement>(null)
	const [isMouseEntered, setIsMouseEntered] = useState(false)

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return
		const { left, top, width, height } =
			containerRef.current.getBoundingClientRect()
		const x = (e.clientX - left - width / 2) / 25
		const y = (e.clientY - top - height / 2) / 25
		containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`
	}

	const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsMouseEntered(true)
		if (!containerRef.current) return
	}

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!containerRef.current) return
		setIsMouseEntered(false)
		containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`
	}
	return (
		<MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
			<div
				className={cn(
					"flex items-center justify-center",
					containerClassName
				)}
				style={{
					perspective: "1000px"
				}}
			>
				<div
					ref={containerRef}
					onMouseEnter={handleMouseEnter}
					onMouseMove={handleMouseMove}
					onMouseLeave={handleMouseLeave}
					className={cn(
						"relative flex items-center justify-center transition-all duration-200 ease-linear",
						className
					)}
					style={{
						transformStyle: "preserve-3d"
					}}
				>
					{children}
				</div>
			</div>
		</MouseEnterContext.Provider>
	)
}

export const CardBody = ({
	children,
	className
}: {
	children: React.ReactNode
	className?: string
}) => {
	return (
		<div
			className={cn(
				"h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
				className
			)}
		>
			{children}
		</div>
	)
}

export const CardItem = ({
	as: Tag = "div",
	children,
	className,
	translateX = 0,
	translateY = 0,
	translateZ = 0,
	rotateX = 0,
	rotateY = 0,
	rotateZ = 0,
	...rest
}: {
	as?: React.ElementType
	children: React.ReactNode
	className?: string
	translateX?: number | string
	translateY?: number | string
	translateZ?: number | string
	rotateX?: number | string
	rotateY?: number | string
	rotateZ?: number | string
	[key: string]: any
}) => {
	const ref = useRef<HTMLDivElement>(null)
	const [isMouseEntered] = useMouseEnter()

	useEffect(() => {
		handleAnimations()
	}, [isMouseEntered])

	const handleAnimations = () => {
		if (!ref.current) return
		if (isMouseEntered) {
			ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
		} else {
			ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`
		}
	}

	return (
		<Tag
			ref={ref}
			className={cn(
				"w-fit transition duration-200 ease-linear",
				className
			)}
			{...rest}
		>
			{children}
		</Tag>
	)
}

// Create a hook to use the context
export const useMouseEnter = () => {
	const context = useContext(MouseEnterContext)
	if (context === undefined) {
		throw new Error(
			"useMouseEnter must be used within a MouseEnterProvider"
		)
	}
	return context
}
import Image from "next/image"
import Link from "next/link"

type props = {
	name: string
	university?: string
	image: string
	role?: string
}

export function ThreeDCard({ name, university, image, role }: props) {
	return (
		<CardContainer className="w-full">
			<CardBody className="group/card relative h-auto w-full rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] md:w-[25rem]  ">
				<CardItem translateZ="100" className="w-full">
					<Image
						src={image}
						height="1000"
						width="1000"
						className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
						alt="thumbnail"
					/>
				</CardItem>

				<CardItem
					translateZ="60"
					className="mt-2 text-xl font-bold text-neutral-600 dark:text-white"
				>
					{name}
				</CardItem>
				{university && (
					<CardItem
						as="p"
						translateZ="50"
						className=" max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
					>
						{university}
					</CardItem>
				)}
				{role && (
					<CardItem
						as="p"
						translateZ="50"
						className=" max-w-sm text-xs text-neutral-500 dark:text-neutral-400"
					>
						{role}
					</CardItem>
				)}
			</CardBody>
		</CardContainer>
	)
}
