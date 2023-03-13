import { useEffect, useState } from "react";
import {
	ImageList,
	ImageListItem,
	Box,
	Collapse,
	Alert,
	IconButton,
	CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const IMAGES = [
	"https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/babel-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/chrome-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/react-original-wordmark.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/docker-original-wordmark.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/vuejs-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/typescript-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/python-original.svg?size=128&color=currentColor",
	"https://icongr.am/devicon/nodejs-original.svg?size=128&color=currentColor",
]
	.flatMap((image) => [`a|${image}`, `b|${image}`])
	.sort(() => Math.random() - 0.5);

export default function Memotest() {
	const [guessed, setGuesssed] = useState<string[]>([]);
	const [selected, setSelected] = useState<string[]>([]);
	const [open, setOpen] = useState(false);
	//prettier-ignore
	const iconSearch ="https://icongr.am/clarity/search.svg?size=128&color=currentColor";

	useEffect(() => {
		if (selected.length == 2) {
			if (selected[0].split("|")[1] === selected[1].split("|")[1]) {
				setGuesssed((guessed) => guessed.concat(selected));
			}
			setTimeout(() => setSelected([]), 1000);
		}
	}, [selected]);

	useEffect(() => {
		if (guessed.length === IMAGES.length) {
			setOpen(true);
			// location.reload();
		}
	}, [guessed]);

	const handleClose = () => {
		location.reload();
	};
	return (
		<>
			{open ? (
				<Box sx={{ width: "100%" }}>
					<Collapse in={open}>
						<Alert
							action={
								<IconButton
									aria-label="close"
									color="inherit"
									//prettier-ignore
									onClick={handleClose}
								>
									<CloseIcon fontSize="inherit" />
								</IconButton>
							}
							sx={{ mb: 2 }}
						>
							You Won!!!
						</Alert>
					</Collapse>
				</Box>
			) : (
				<ImageList sx={{ width: "100%", maxHeight: "80%" }} cols={5} gap={20}>
					{IMAGES.map((image) => {
						const [, url] = image.split("|");
						return (
							<ImageListItem
								onClick={() =>
									selected.length < 2 &&
									setSelected((selected) => selected.concat(image))
								}
								key={image}
								style={{
									cursor: "pointer",
									padding: 12,
									border: "1px solid #33E9FF",
									borderRadius: 12,
									background: "#001b38",
									color: "#33E9FF",
								}}
								sx={{ minHeight: 100, minWidth: 100 }}
							>
								{selected.includes(image) || guessed.includes(image) ? (
									<img alt="icon" src={url} />
								) : (
									<img
										key={url}
										alt="icon"
										// prettier-ignore
										src={iconSearch}
									/>
								)}
							</ImageListItem>
						);
					})}
				</ImageList>
			)}
		</>
	);
}
