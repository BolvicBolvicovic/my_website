// TODO: make current_dir working in hash so that people that type a dir with a hash are redirected to the correct dir.

/* CLASSES */

/* Name: RingBuffer
 * Description: ring buffer class for O(1) sized history constant performance.
 * Usage: 
 * let rb0 = new RingBuffer(size);
 * let rb2 = RingBuffer.fromArray(array);
 * let rb3 = RingBuffer.fromArray(array, size);
 * */
class	RingBuffer {
	constructor(size = 500) {
		this.size = size;
		this.buffer = new Array(size);
		this.head = 0;
		this.count = 0;
		this.readHead = 0;
	}

	static fromArray(arr, size = 500) {
		let	ringBuffer = new RingBuffer(size);

		ringBuffer.count = arr.length;

		for (let i = 0; i < arr.length; i++) {
			ringBuffer.pushBack(arr[i]);
		}

		return ringBuffer;
	}

	pushBack(value) {
		this.buffer[this.head] = value;
		this.head = (this.head + 1) % this.size;
		this.readHead = this.head;
		if (this.count < this.size) this.count++;
	}

	toArray() {
		let	result = [];

		for (let i = 0; i < this.count; i++) {
			const index = (this.head - this.count + i + this.size) % this.size;
			result.push(this.buffer[index]);
		}

		return result;
	}

	clear() {
		this.head = 0;
		this.count = 0;
		this.readHead = 0;
	}

	readPrevious() {
		if (!this.count) return null;

		const	previous = (this.readHead - 1 + this.size) % this.size;
		const	oldest = (this.head - this.count + this.size) % this.size;

		if (previous >= this.count || previous === (oldest - 1 + this.size) % this.size)
			return null;

		this.readHead = previous;

		return this.buffer[this.readHead];
	}

	readNext() {
		if (!this.count || this.readHead === this.head) return null;
			
		const	next = (this.readHead + 1) % this.size;

		this.readHead = next;

		if (next === this.head) return null;

		return this.buffer[this.readHead];
	}
}

/* CONSTANTS */
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
If you do not have the time to interact, click <a href="#whoami" style="color: ${green};">here</a> to see who I am.

<span style="color: ${green};">How to use:</span>
Type a <span style="color: ${yellow};">command</span> (the yellow words below) and press Enter to explore.

<span style="color: ${green};">Quick start:</span>
	<span style="color: ${yellow};">read whoami</span>   Learn about me
	<span style="color: ${yellow};">cd posts</span>      Explore my blog posts 
	<span style="color: ${yellow};">ls</span>            Show what's available (<span style="color: ${dusty_blue};">folders</span> are blue, files are white)

<span style="color: ${dusty_blue};">Try it now: type read whoami and press Enter</span>

Type <span style="color: ${yellow};">help</span> anytime to see available commands.
Type <span style="color: ${yellow};">help [second command]</span> for detailed information about a specific command.
`;

// TODO: Write projects based on pined project on github, add poems
const	FS = Object.freeze({
	pwd: "/",
	files: ["whoami"],
	dir: [
		{
			pwd: "poems",
			files: [],
			dir: []
		},
		{
			pwd: "portfolio",
			files: [],
			dir: []
		},
		{
			pwd: "posts",
			files: ["branchless"],
			dir: []
		}
	]
});

// TODO: delete this for prod
document.getElementById("stylesheet").href = "style.css?v=" + new Date().getTime();

const	reader					= document.getElementById("reader");
const	reader_output				= document.getElementById("reader-output");
const	terminal				= document.getElementById("terminal");
const	terminal_output				= document.getElementById("terminal-output");
const	terminal_input_output_welcome_message	= document.getElementById("terminal-output-welcome-message");
const	terminal_input				= document.getElementById("terminal-input");
const	terminal_input_prompt			= document.getElementById("terminal-input-prompt");

const	is_mobile				= /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

/* FILES */
const	file_whoami = `
<h1>WHOAMI</h1>
Hi, I'm Victor 🚀

I'm a software engineer with a deep fascination for how computers work — from the smallest embedded systems to complex kernels.

<span style="color: ${green};">Background: atypical</span>
I specialized in Kernel and System programming at 42, and I'm currently expanding my expertise in Embedded Systems at Hermods in Sweden, where I'm also learning Swedish.
Before learing how to code, I did various things.
In highschool, I was mainly studying science but I bifurcated right at the start of my college years. I wanted to become a writer. I went to an intensive course for literature called "prépa". Then I went to la Sorbonne University to continue in the field of literature. I found out that I did not like the environment and instead I started to work in a museum's bookshop.
As I was missing out logical thinking from my time in highschool, I dedided to give coding a shot and found out there was a 42 school opening in Le Havre: I moved there and this is how my journey as a software developer started.

<span style="color: ${green};">What drives me: curiosity and passion</span>
I spend most of my time exploring new concepts and building software. When I'm not coding, you'll find me with a book — some favorites include The Old Man and the Sea, The Brothers Karamazov, and The Master and Margarita.

<span style="color: ${green};">What I'm working on: embedded systems</span>
Right now, I'm focused on understanding the intrinsect of IoT by learning how the software interacts with the WiFi related hardware and becoming fluent in Swedish.

<span style="color: ${green};">Why am I in Sweden: </span><span style="color: red;">Love</span>

<span style="color: ${dusty_blue};">Want to connect?</span>
Check out my projects in the portfolio folder or on my <a href="https://github.com/BolvicBolvicovic">github</a>.
You can mail me at victor.cornille@gmail.com or message me on <a href="https://www.linkedin.com/in/victorcornille"/>LinkedIn</a>.
`;
const	file_notes_branchless = `
<h1>Branchless C code</h1>
Link to the <a href="https://github.com/BolvicBolvicovic/branchless">project</a>.
`;

const	saved_history		= localStorage.getItem("history");
const	saved_hints_enabled	= localStorage.getItem("hints_enabled");

/* VARIABLES */
let	current_dir		= FS;
let	history			= saved_history
					? RingBuffer.fromArray(JSON.parse(saved_history))
					: new RingBuffer();
let	reading			= false;
let	hints_enabled		= saved_hints_enabled === "1" || saved_hints_enabled === null;

/* ERRORS */
const unknown_directory	= "Error: Unknown directory. Maybe you misstyped the directory name.";
const unknown_command	= "Error: Unknown command. Maybe you misstyped the command.";
const unknown_file	= "Error: Unknown file. Maybe you misstyped the file name or its path.";

/* HELPERS */

/* Name: handle_path_hash
 * Description: handles the path's hash at initial load and on back/forward buttons.
 * Return type: none
 * */
function	handle_path_hash() {
	const	hash = window.location.hash;
	
	if (hash) {
		const	no_hash_hash	= hash.replace("#", "");
		const	path		= no_hash_hash.split("/");
		open_reader(get_file(path), no_hash_hash);
	}
}

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
	if (path.length === 0)
		return dir; 
	
	const	first_dir	= path[0];
	
	for (let i = 0; i < dir.dir.length; i++) {
		if (dir.dir[i].pwd == first_dir)
			return get_dir(path.slice(1), dir.dir[i]);
	}

	return unknown_directory;
}

/* Name: get_file
 * Description: extracts the file_name from a path and returns its corresponding file.
 * Return type: string
 * */
function	get_file(path) {
	const	file = path.pop();
	const	dir = get_dir(path, current_dir);

	if (dir == unknown_directory)
		return unknown_file;

	if (!dir.files.includes(file))
		return unknown_file;

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
	const	path		= args.split("/");
	
	switch (command) {
		case "clear_cache":
			return clear_cache();
		case "latest":
			return latest();
		case "read":
			return open_reader(get_file(path), args)
		case "ls":
			if (args == "") return ls(current_dir);
			return ls(get_dir(path, current_dir));
		case "cd":
			if (args == "") return cd(FS);
			if (args.startsWith("/")) return cd(get_dir(path, FS));
			return cd(get_dir(path, current_dir));
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

/* Name: place_caret_at_end
 * Description: places the caret (place where the next char input will be written) at the end of a node.
 * Return type: none
 * */
function	place_caret_at_end(node) {
// Note: .focus() puts the cursor at the end when you click under the input
// and at the start when you click over the input.
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

/* Name: clear_cache
 * Description: clears the history and the toggle_hints (enabling it).
 * Usage: clear_cache
 * */
function	clear_cache() {
	history.clear();
	hints_enabled = true;
	localStorage.clear();

	return `Hint: You have cleared the cache.
Hints are <span style="color: ${green};">enabled</span>.
If you arrow up, you will not be able to see your previous commands.`;
}

/* Name: toggle_hints
 * Description: toggle hints and prints an explicit message concerning the new state.
 * Usage: toggle_hints
 * */
function	toggle_hints() {
	hints_enabled = !hints_enabled;

	localStorage.setItem("hints_enabled", hints_enabled ? "1": "0");

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
	terminal_output.innerHTML = "";

	if (hints_enabled) {
		return "\nHint: You have cleared the terminal. You cannot scroll back. If you wish to see the welcome message, reload the page.";
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
	if (hints_enabled)
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

	current_dir = dir;
	terminal_input_prompt.textContent = build_line_tag();
	
	if (hints_enabled)
		return `
Hint: You have moved to <span style="color: ${dusty_blue};">${dir.pwd}</span>.
You can see the current folder you are in by looking at the last word of ${terminal_input_prompt.textContent}.
You can choose to list everything in the folder by typing <span style="color: ${yellow};">ls</span> or you can read/open a file by typing <span style="color: ${yellow};">read name_of_the_file</span>.
Do not forget to hit enter to execute the command!
 `;

	return "";
}

/* Name: open_reader
 * Description: opens a file in a reader.
 * In the reader, you can:
 * 	- scroll with the mouse, the pad or the arrows up and down.
 * 	- quit by hitting q.
 * Usage: read <FILE>
 * */
function	open_reader(file, path) {
	if (file === unknown_file)
		return unknown_file;

	terminal_input.contentEditable = false;
	reader_output.innerHTML = file;
	reading = true;
	terminal.style.display = "none";
	reader.style.display = "";
	reader.focus();

	window.location.hash = path;
	
	return "";
}

/* Name: close_reader
 * Description: clears the file in the reader and closes the reader.
 * Usage: <press q>
 * */
function	close_reader() {
	reader.style.display = "none";
	terminal.style.display = "";
	reader_output.innerHTML = "";
	terminal_input.contentEditable = true;
	terminal_input.focus();
	window.location.hash = "";
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
		case "clear_cache":
			return `/* Name: clear_cache
 * Description: clears the history and the toggle_hints (enabling it).
 * Usage: clear_cache
 * */`;
		case "toggle_hints":
			return `/* Name: toggle_hints
 * Description: toggle hints and prints an explicit message concerning the new state.
 * Usage: toggle_hints
 * */`;
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
terminal_input_output_welcome_message.innerHTML	= welcome_message;
terminal_input_prompt.textContent		= build_line_tag();

window.addEventListener("DOMContentLoaded", handle_path_hash);
window.addEventListener("hashchange", handle_path_hash);

reader.addEventListener("click", () => {
	const	selection = window.getSelection();

	if (selection.toString().length === 0 && reading)
		reader.focus();
});

terminal.addEventListener("click", (e) => {
	const	selection = window.getSelection();

	if (selection.toString().length === 0 && !reading)
		terminal_input.focus();
});

if (!is_mobile) {
	terminal_input.focus();
}

terminal_input.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		e.preventDefault();

		if (is_mobile) {
			terminal_input.blur();
		}

		const	command		= terminal_input.innerText.trim();
		const	command_line	= document.createElement("div");
		let	response_line;

		command_line.textContent= terminal_input_prompt.textContent + command; 
		terminal_output.appendChild(command_line);

		if (command) {
			response_line = document.createElement("div");

			history.pushBack(command);
			response_line.innerHTML = run_command(command);
			terminal_output.appendChild(response_line);
			terminal_input.innerText = "";

			localStorage.setItem("history", JSON.stringify(history.toArray()));
		}
		
		terminal.scrollTop = terminal.scrollHeight;
	}
	
	if (e.key === "ArrowUp") {
		e.preventDefault();

		const	previous_command = history.readPrevious();

		if (previous_command !== null) {
			terminal_input.innerText = previous_command;
			place_caret_at_end(terminal_input);
		}
	}

	if (e.key === "ArrowDown") {
		e.preventDefault();

		const	next_command = history.readNext();

		if (next_command !== null) {
			terminal_input.innerText = next_command;
		} else {
			terminal_input.innerText = "";
		}

		place_caret_at_end(terminal_input);
	}
});

reader.addEventListener("keydown", (e) => {
	if (e.key === "q" ) {
		e.preventDefault();
		close_reader();
		reading = false;
	}
});
