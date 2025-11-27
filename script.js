/* CONSTANTS */
const	reader_base_inner_html = `<span style="position: fixed;bottom: 0;left: 0;width: 100%;padding: 10px;background-color: #111111;border-top: 1px solid #333333;">press '<span style="color: red;">q</span>' to <span style="color: red;">quit</span> (go back)</span>`;
const	dusty_blue = "#7eb3d4";
const	yellow = "#f1fa8c";
const	green = "#50fa7b";
const	welcome_message = `
  _                                 ___                        _   _
 (_|   |_/o                        / (_)                   o  | | | |
   |   |      __ _|_  __   ,_     |      __   ,_    _  _      | | | |  _
   |   |  |  /    |  /  \\_/  |    |     /  \\_/  |  / |/ |  |  |/  |/  |/
    \\_/   |_/\\___/|_/\\__/    |_/   \\___/\\__/    |_/  |  |_/|_/|__/|__/|__/


Welcome to my interactive portfolio/blog.
If you do not have the time to interact, click <a href="/whoami" style="color: ${green};">here</a> to see who I am.

<span style="color: ${green};">How to use:</span>
Type <span style="color: ${yellow};">commands</span> (the yellow words bellow) below and press Enter to explore.

<span style="color: ${green};">Quick start:</span>
	<span style="color: ${yellow};">read whoami</span>   Learn about me
	<span style="color: ${yellow};">cd posts</span>      Explore my blog posts 
	<span style="color: ${yellow};">ls</span>            Show what's available (<span style="color: ${dusty_blue};">folders</span> are blue, files are white)

<span style="color: ${dusty_blue};">Try it now: type read whoami and press Enter</span>

Type <span style="color: ${yellow};">help</span> anytime to see available commands.
Type <span style="color: ${yellow};">help [second command]</span> for detailed information about a specific command.
`;

const	file_whoami = `
<h1>WHOAMI</h1>
Hi, I'm Victor 🚀

I'm a software engineer with a deep fascination for how computers work — from the smallest embedded systems to complex kernels.

<span style="color: ${green};">Background</span>
I specialized in Kernel and System programming at 42, and I'm currently expanding my expertise in Embedded Systems at Hermods in Sweden, where I'm also learning Swedish.

<span style="color: ${green};">What drives me</span>
I spend most of my time exploring new concepts and building software. When I'm not coding, you'll find me with a book — some favorites include The Old Man and the Sea, The Brothers Karamazov, and The Master and Margarita.

<span style="color: ${green};">What I'm working on</span>
Right now, I'm focused on [mention current project or learning goal].

<span style="color: ${dusty_blue};">Want to connect?</span>
Check out my projects in the portfolio folder or on my <a href="https://github.com/BolvicBolvicovic">github</a>.
You can mail me at victor.cornille@gmail.com or message me on <a href="https://www.linkedin.com/in/victorcornille"/>LinkedIn</a>.
`;
const	file_notes_branchless = ``;

const	FS = Object.freeze({
	pwd: "/",
	files: ["whoami"],
	dir: [
		{
			pwd: "posts",
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
document.getElementById("stylesheet").href = "style.css?v=" + new Date().getTime();

const	reader				= document.getElementById("reader");
const	terminal			= document.getElementById("terminal");
const	output				= document.getElementById("output");
const	output_welcome_message		= document.getElementById("output-welcome-message");
const	input				= document.getElementById("input");
const	input_line_tag			= document.getElementById("input-line-tag");

/* VARIABLES */
let	current_dir			= FS;
let	history				= [];
let	history_index			= -1;
let	reading				= false;
let	hints_enabled			= true;

/* ERRORS */
const unknown_directory	= "Error: Unknown directory. Maybe you misstyped the directory name.";
const unknown_command	= "Error: Unknown command. Maybe you misstyped the command.";
const unknown_file	= "Error: Unknown file. Maybe you misstyped the file name.";

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
 * Description: extracts the dir_name from a path and return its corresponding directory.
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

/* Name: get_file
 * Description: extracts the file_name from a path and returns its corresponding file.
 * Return type: string
 * */
function	get_file(path) {
	// TODO: enforce this so that the path has to be correct too.
	const	file = path.split("/").pop();

	switch (file) {
		case "branchless":
			return file_notes_branchless;
		case "whoami":
			return file_whoami;
		default:
			return unknown_file;
	}
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
		case "latest":
			return latest();
		case "read":
			return open_reader(get_file(args))
		case "ls":
			return ls(get_dir(args, current_dir));
		case "cd":
			if (args == "") return cd(FS);
			if (args.startsWith("/")) return cd(get_dir(args, FS));
			return cd(get_dir(args, current_dir));
		case "clear":
			return clear();
		case "help":
			return help(args);
		case "toggle_hints":
			return toggle_hints();
		default:
			return unknown_command;
	}
}

/* Name: search
 * Description: search a pattern in the reader's file.
 * Return type: string
 * */
function	search(pattern) {
	return "TODO";
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

/* Name: toggle_hints
 * Description: toggle hints and prints an explicit message concerning the new state.
 * Usage: toggle_hints
 * */
function	toggle_hints() {
	hints_enabled = !hints_enabled;

	if (hints_enabled) {
		return `Hints are now <span style="color: ${green};">enabled</span>.`;
	}

	return 'Hints are now <span style="color: red;">disabled</span>.';
}

/* Name: clear
 * Description: clears the terminal from all previous inputs.
 * Usage: clear
 * */
function	clear() {
	output.innerHTML = "";

	if (hints_enabled) {
		return "Hint: You have cleared the terminal. You cannot scroll back. If you wish to see the welcom message, reload the page.";
	}

	return "";
}

/* Name: ls
 * Description: prints the list of all files and folders in the chosen directory. Defaults to current_dir.
 * Usage: ls <DIR>
 * */
function	ls(dir) {
	if (dir == unknown_directory)
		return unknown_directory;

	let	fs_list = [...dir.files];

	for (let i = 0; i < dir.dir.length; i++) {
		const	colored_dir = `<span style="color: ${dusty_blue};">${dir.dir[i].pwd}</span>`;
		fs_list.push(colored_dir);
	}
	
	// TODO: find a way to make the color work with the sort.
	// fs_list.sort();
	if (toggle_hints)
		return fs_list.join(" ") + `

Hint: You have listed the content of <span style="color: ${dusty_blue};">${dir.pwd}</span>.
<span style="color: ${dusty_blue}">Folders</span> are in blue and files are in white.
You can choose to read a file by typing <span style="color: ${yellow};">read name_of_the_file</span> or move to a folder by typing <span style="color: ${yellow};">cd name_of_the_folder</span>.
Do not forget to hit enter to execute the command!
 `;

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
	
	if (hints_enabled)
		return `
Hint: You have moved to <span style="color: ${dusty_blue};">${dir.pwd}</span>.
You can see the current folder you are in by looking at the last word of ${input_line_tag.textContent}.
You can choose to list everything in the folder by typing <span style="color: ${yellow};">ls</span> or you can read/open a file by typing <span style="color: ${yellow};">read name_of_the_file</span>.
Do not forget to hit enter to execute the command!
 `;

	return "";
}

/* Name: open_reader
 * Description: opens a file in a reader.
 * In the reader, you can:
 * 	- scroll with the mouse, the pad or the arrows up and down.
 * 	- search for an open file by hitting the "/" button and then type the word.
 * 	Press enter to 'goto' the next found word.
 * 	Press ESC to quit the search mode.
 * 	- quit by hitting q.
 * Usage: read <FILE>
 * */
function	open_reader(file) {
	if (file === unknown_file)
		return unknown_file;

	input.contentEditable = false;
	reader.innerHTML = `<div>${file}</div>` + reader_base_inner_html;
	reading = true;
	terminal.style.display = "none";
	reader.style.display = "";
	reader.focus();
	
	return "";
}

/* Name: close_reader
 * Description: clears the file in the reader and closes the reader.
 * Usage: <press q>
 * */
function	close_reader() {
	reader.style.display = "none";
	terminal.style.display = "";
	reader.innerHTML = "";
	input.contentEditable = true;
	input.focus();
}


/* Name: latest
 * Description: shortcut for read <LATEST POSTED FILE>.
 * Usage: latest
 * */
function	latest() {
	return read(file_notes_branchless);
}

/* Name: help
 * Description: prints a helper for a command.
 * Usage: help <CMD>
 * Available commands:
 *	- latest	: shortcut to read command with the latest posted file.
 *	- ls	<DIR>	: lists all files in the current folder.
 *	- cd	<DIR>	: change to current working folder to <DIR>.
 *	- read	<FILE>	: opens a file in a reader.
 *	- clear		: clears the entire history. Care, you will not be able to scroll back.
 *	- help	<CMD>	: prints all information about the command <CMD>.
 * */
function	help(arg) {
	switch (arg) {
		case "toggle_hints":
			return `/* Name: toggle_hints
 * Description: toggle hints and prints an explicit message concerning the new state.
 * Usage: toggle_hints
 * */
			`;
		case "ls":
			return `/* Name: ls
 * Description: prints the list of all files and folders in the chosen directory.
 * Defaults to the current directory.
 * Usage: ls [DIR]
 * */`;
		case "cd":
			return `/* Name: cd
 * Description: change the working directory.
 * Usage: cd [DIR]
 * */`;
		case "latest":
			return `/* Name: latest
 * Description: shortcut for read [LATEST POSTED FILE].
 * Usage: latest
 * */`;
		case "clear":
			return `/* Name: clear
 * Description: clears the terminal from all previous inputs.
 * Usage: clear
 * */`;
		case "read":
			return `/* Name: read
 * Description: opens a file in a reader.
 * In the reader, you can:
 * 	- scroll with the mouse, the pad or the arrows up and down.
 * 	- search for an open file by hitting the "/" button and then type the word.
 * 	Press enter to 'goto' the next found word.
 * 	Press ESC to quit the search mode.
 * 	- quit by hitting q.
 * Usage: read [FILE]
 * */`;
		case "help":
		case "":
			return `/* Name: help
 * Description: prints a helper for a command.
 * Usage: help [CMD]
 * Available commands:
 *	- latest	: shortcut to read command with the latest posted file.
 *	- ls	[DIR]	: lists all files in the current folder.
 *	- cd	[DIR]	: change to current working folder to [DIR].
 *	- read	[FILE]	: opens a file in a reader.
 *	- clear		: clears the entire history. Care, you will not be able to scroll back.
 *	- help	[CMD]	: prints all information about the command [CMD].
 * */`;
	}
}

/* INIT */
output_welcome_message.innerHTML	= welcome_message;
input_line_tag.textContent		= build_line_tag();

reader.addEventListener("click", () => {
	const	selection = window.getSelection();

	if (selection.toString().length === 0 && reading)
		reader.focus();
});

terminal.addEventListener("click", (e) => {
	const	selection = window.getSelection();

	if (selection.toString().length === 0 && !reading)
		input.focus();

	if (e.target.matches('a[href="/whoami"]')) {
		e.preventDefault();
		open_reader(file_whoami);
	}
});

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

reader.addEventListener("keydown", (e) => {
	if (e.key === "q" ) {
		e.preventDefault();
		close_reader();
		reading = false;
	}
});
