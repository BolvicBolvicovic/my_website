/* CONSTANTS */
const	welcome_message = `
Welcome to my website.
Here you can find the lastest news about my ongoing projects.
To navigate the website, use commands:
	- ls	<DIR>
	- cd	<DIR>
	- read	<FILE>
	- clear
	- help
`;

const	FS = Object.freeze({
	pwd: "/",
	files: ["whoami"],
	dir: [
		{
			pwd: "notes",
			files: ["branchless"],
			dir: []
		},
		{
			pwd: "portfolio",
			files: [],
			dir: []
		}
	]
});

// TODO: delete this for prod
const	stylesheet			= document.getElementById("stylesheet");
stylesheet.href = "style.css?v=" + new Date().getTime();

const	terminal			= document.getElementById("terminal");
const	output				= document.getElementById("output");
const	output_welcome_message		= document.getElementById("output-welcome-message");
const	input				= document.getElementById("input");
const	input_line_tag			= document.getElementById("input-line-tag");

/* VARIABLES */
let	current_dir			= FS;
let	history				= [];
let	history_index			= -1;

/* ERRORS */
const unknown_directory	= "Error: Unknown directory";
const unknown_command	= "Error: Unknown command";

/* ENUMS */
const	COMMANDS = Object.freeze({
	ls: "ls",
	cd: "cd",
	read: "read",
	clear: "clear",
	help: "help"
});

/* HELPERS */

/* Name: build_line_tag
 * Description: builds the tag for the start of a line based on the current_dir.pwd.
 * Return type: string
 * */
function	build_line_tag() {
	const	line_tag_start	= "[victor_cornille@my_website ";
	const	line_tag_end	= "]$ ";
	
	return line_tag_start + current_dir.pwd + line_tag_end;
}

/* Name: get_dir
 * Description: extracts the dir_name from a path and return the asked directory.
 * Return type: Object { pwd: string, files: array, dir: array }.
 * On error: string
 * */
function	get_dir(path, dir) {
	const	path_split	= path.split("/");
	const	first_dir	= path_split[0];

	if (first_dir == "")
		return dir; 
	
	for (let i = 0; i < dir.dir.length; i++) {
		if (dir.dir[i].pwd == first_dir)
			return get_dir(path_split.slice(1).join("/"), dir.dir[i]);
	}

	return unknown_directory;
}

/* Name: run_command
 * Description: runs the user's command.
 * Return type: string
 * */
function	run_command(line) {
	const	split_line	= line.split(" ");
	const	command		= split_line[0];
	const	args		= split_line.slice(1).join(" ");
	
	switch (command) {
		case "ls":
			return ls(get_dir(args, current_dir));
		case "cd":
			if (args == "") return cd(FS);
			return cd(get_dir(args, current_dir));
		case "clear":
			return clear();
		default:
			return unknown_command;
	}
}

/* Name: place_caret_at_end
 * Description: places the caret (place where the next char input will be written) at the end of a node.
 * Return type: none
 * */
function	place_caret_at_end(node) {
	node.focus();

	const	range		= document.createRange();
	range.selectNodeContents(node);
	range.collapse(false);

	const	selection	= document.getSelection();
	selection.removeAllRanges();
	selection.addRange(range);
}

/* COMMANDS 
 * 
 * Note: All commands function MUST return a string.
 * That string is added to the stdout.
 * */

/* Name: clear
 * Description: clears the terminal from all previous inputs.
 * Usage: clear
 * */
function	clear() {
	output.innerHTML = "";
	return "";
}

/* Name: ls
 * Description: list files and folders in the chosen directory. Defaults to current_dir.
 * Usage: ls <DIR>
 * */
function	ls(dir) {
	if (dir == unknown_directory)
		return unknown_directory;

	let	fs_list = [...dir.files];

	for (let i = 0; i < dir.dir.length; i++) {
		const	colored_dir = `<span style="color: #7eb3d4;">${dir.dir[i].pwd}</span>`;
		fs_list.push(colored_dir);
	}
	
	// TODO: find a way to make the color work with the sort.
	// fs_list.sort();

	return fs_list.join(" ");
}

/* Name: cd
 * Description: change the working directory.
 * Usage: cd <DIR>
 * */
function	cd(dir) {
	if (dir == unknown_directory)
		return unknown_directory;

	current_dir			= dir;
	input_line_tag.textContent	= build_line_tag();

	return "";
}

/* INIT */
output_welcome_message.textContent	= welcome_message;
input_line_tag.textContent		= build_line_tag();

terminal.addEventListener("click", () => input.focus());
input.focus();
input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();

		const	command		= input.innerText.trim();
		const	command_line	= document.createElement("div");

		command_line.textContent= input_line_tag.textContent + command; 
		output.appendChild(command_line);

		if (command) {
			const	response_line	= document.createElement("div");

			history.push(command);
			history_index = history.length;
			response_line.innerHTML = run_command(command);
			output.appendChild(response_line);
			input.innerText = "";
		}
		terminal.scrollTop = terminal.scrollHeight;
	}
	
	if (e.key === "ArrowUp") {
		e.preventDefault();

		if (history_index > 0) {
			history_index--;
			input.innerText = history[history_index]
			place_caret_at_end(input);
		}
	}

	if (e.key === "ArrowDown") {
		e.preventDefault();

		if (history_index < history.length - 1) {
			history_index++;
			input.innerText = history[history_index];
		} else {
			history_index = history.length;
			input.innerText = "";
		}

		place_caret_at_end(input);
	}
});
