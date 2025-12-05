/* ERRORS */
const unknown_directory = "Directory not found. Please check the name.";
const unknown_command = "Command not found. Please check the spelling.";
const unknown_file = "File not found. Please check the name and path.";

/* CLASSES */

/* Name: RingBuffer
 * Description: ring buffer class for O(1) sized history constant performance.
 * Usage: 
 * let rb0 = new RingBuffer(size);
 * let rb1 = RingBuffer.fromArray(array);
 * let rb2 = RingBuffer.fromArray(array, head);
 * let rb3 = RingBuffer.fromArray(array, head, size);
 * */
class	RingBuffer {
	constructor(size = 500) {
		this.size = size;
		this.buffer = new Array(size);
		this.head = 0;
		this.count = 0;
		this.readHead = 0;
	}

	static fromArray(arr, head = 0, size = 500) {
		let	ringBuffer = new RingBuffer(size);

		for (let i = 0; i < arr.length; i++) {
			ringBuffer.buffer[i] = arr[i];
		}

		ringBuffer.head = parseInt(head);
		ringBuffer.readHead = ringBuffer.head;
		ringBuffer.count = arr.length;

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
	<span style="color: ${yellow};">read whoami</span>    Learn about me
	<span style="color: ${yellow};">cd posts</span>       Explore my blog posts 
	<a href="#posts/branchless" style="color: ${yellow};">latest</a>         Read my latest post

<span style="color: ${dusty_blue};">Try it now: type <span style="color: ${yellow};">read whoami</span> and press Enter</span>

Type <span style="color: ${yellow};">help</span> anytime to see available commands.
Type <span style="color: ${yellow};">help [second command]</span> for detailed information about a specific command.
`;

// TODO: Write projects based on pined project on github, add poems
const	FS = Object.freeze({
	pwd: "",
	files: ["whoami"],
	dir: [
		{
			pwd: "poems",
			files: [],
			dir: []
		},
		{
			pwd: "portfolio",
			files: ["esp8266_NON_SDK_NON_OS", "kfs"],
			dir: []
		},
		{
			pwd: "posts",
			files: ["branchless"],
			dir: []
		}
	]
});


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
<div class="text-block">
Hi, I'm Victor 🚀

I'm a software engineer with a deep fascination for how computers work — from the smallest embedded systems to complex kernels.

<span style="color: ${green};">Background: atypical</span>
I specialized in Kernel and System programming at 42, and I'm currently expanding my expertise in Embedded Systems at Hermods in Sweden, where I'm also learning Swedish.

Before learing how to code, I did various things.
In highschool, I was mainly studying science but I bifurcated right at the start of my college years. I wanted to become a writer. I went to an intensive course for literature called "prépa". Then I went to la Sorbonne University to continue in the field of literature. I found out that I did not like the environment and instead I started to work in a museum's bookshop.

As I was missing out logical thinking from my time in highschool, I decided to give coding a shot and found out there was a 42 school opening in Le Havre: I moved there and this is how my journey as a software developer started.

<span style="color: ${green};">What drives me: curiosity and passion</span>
I spend most of my time exploring new concepts and building software. When I'm not coding, you'll find me with a book — some favorites include The Old Man and the Sea, The Brothers Karamazov, and The Master and Margarita.

<span style="color: ${green};">What I'm working on: embedded systems</span>
Right now, I'm focused on understanding the intricacies of IoT by learning how the software interacts with the WiFi related hardware and becoming fluent in Swedish.

<span style="color: ${green};">Why am I in Sweden: </span><span style="color: red;">Love</span>

<span style="color: ${dusty_blue};">Want to connect?</span>
Check out my projects in the portfolio folder or on my <a href="https://github.com/BolvicBolvicovic">github</a>.
You can mail me at victor.cornille@gmail.com or message me on <a href="https://www.linkedin.com/in/victorcornille"/>LinkedIn</a>.</div>
`;
const	file_posts_branchless = `
<h1>Branchless C code</h1>
<div class="text-block">I wanted for some time to study the arcana of branchless code. Turning C code with many branches into branchless C that looks esoteric is a very attractive trick for the student that I am.

Furthermore, it is possible to find some actual performance benefit in doing so. To start my quest, I designed 5 small exercises of various difficulties that you can find on my <a href="https://github.com/BolvicBolvicovic/branchless">github</a>.

Below is one of them: turning a basic branching version of a median between three numbers that uses classic comparisons into a branchless version:</div>
<pre><code>/* Branching version: return the median of a, b, c using comparisons */
int
median_branch(int a, int b, int c)
{
	if (a > b)
	{
		if (b > c)
			return b; /* a > b > c */
		else if (a > c)
			return c; /* a > c >= b */
		else
			return a; /* c >= a > b */
	}
	else
	{
		if (a > c)
			return a; /* b >= a > c */
		else if (b > c)
			return c; /* b > c >= a */
		else
			return b; /* c >= b >= a */
	}
}
</code></pre>
<div class="text-block">If you find this code ugly, that it is not the most efficient way to compute a median between three values: sure. And there is another problem to it. The decompiled version, (obtained with <a href="https://godbolt.org/">godbolt</a> or gcc -O2 -S -masm=intel main.c -o -), has a conditional jump which could potentially lead to many instruction cache misses and lower the performance drastically if a big amount of data needs to be piped into that function and that the branch predictor is not that performant:</div>
<pre><code>	.globl	median_branch
	.type	median_branch, @function
median_branch:
.LFB11:
	.cfi_startproc
	cmp	edi, esi
	jle	.L2		// Notice the conditional jump here (Jump Less or Equal)
	cmp	edi, edx
	mov	eax, esi
	cmovg	edi, edx
	cmp	esi, edx
	cmovle	eax, edi
	ret
	.p2align 4,,10
	.p2align 3
.L2:
	cmp	esi, edx
	mov	eax, edi
	cmovg	esi, edx
	cmp	edi, edx
	cmovle	eax, esi
	ret
	.cfi_endproc
</code></pre>
<div class="text-block">To be able to handle these multiple branches into branchless code, we need to understand two concepts:</div>
<h3>1. XOR "Pairs"</h3>
<div class="text-block">What I call a XOR pair is just a concept that helps me to visualize/understand how two integers can be "pushed" into one value and "popped" from that value.

For a XOR pair 'X' and an integer 'a', 'a' is said pushed to 'X' when 'a' is XORed with 'X' for the first time.
If 'a' has been pushed to 'X', the next time 'a' is XORed with 'X', 'a' will be popped and 'X' will have the value of the other integer:</div>
<pre><code>int	a = 42;
int	X = 1;

X ^= a;		// 'a' is pushed into 'X'	(X == 43)
X ^= a;		// 'a' is popped from 'X'	(X == 1)
</code></pre>
<h3>2. Conditional mask</h3>
<div class="text-block">A conditional mask is a mask that is built from a comparison by taking advantage that a boolean in C is also a 1 or a 0:</div>
<pre><code>int	a = 0;
int	b = 1;

// Instead of writing if (a < b) a+= 42;

a += 42 & -(a < b);

// Explanation:
// a < b is true, meaning it equals to 1.
// Then inverting 1 into -1 gives the mask 0xffffffff.
// ANDing with 42 returns 42, which is then added to a.
// If the mask was false, it would give the mask 0x00000000
// and ANDing with 42 would result in 0, not adding anything.
</code></pre>
<div class="text-block">We will use these two concepts together to be able to solve our problem with the median.</div>

<h3>💡 Some tips I learned by doing these exercises</h3>
<div class="text-block">Alongside these two concepts, I realized a couple of things, starting with the most important:</div>
<h4>Always check assembly first</h4>
<div class="text-block">Do not try to "un-branch" your code before reading its decompiled version. Some piece of code in the exercises I made DO NOT need to be rewritten in a branchless fashion. In many cases, your compiler will have done the work for you. In fact, the compiled version of the branched clamp_range (one of the exercises) is branchless and has one comparison less than the rewritten version.</div>
<h4>Reduce problem to a pair problem</h4>
<div class="text-block">Try to reduce a "multi-conditional" assertion into a bunch of interacting pairs. That allows you to select one of two values very easily with a conditional mask.</div>
<h4>Versatility of a conditional mask</h4>
<div class="text-block">Any function/operation returning a boolean can be used with a conditional mask.</div>

<h3>The solution</h3>
<div class="text-block">In the code with branching, we only do 3 comparisons in total. We can inspire ourselves from that by creating 3 masks for each cases:</div>
<pre><code>int	a_less_b = -(a < b);	// -1 or 0
int	a_less_c = -(a < c);	// -1 or 0
int	b_less_c = -(b < c);	// -1 or 0
</code></pre>
<div class="text-block">Notice that we do the opposite comparison from the original branched code comparison. The reason for that is that our conditional mask will help us decide if we want to "pop" or "push" our number into a pair. We are going to use one of our tips: try to reduce a "multi-conditional" assertion into a bunch of interacting pairs. The branched version of the code does for one of the cases:</div>
<pre><code>if (a > b)
{
	if (b > c)
		return b; /* a > b > c */
	...
}
// We could have written if (a > b && b > c) return b;
</code></pre>
<div class="text-block">This algorithm does not seem to fit our use case since it forces the interaction of 3 numbers and we want pairs. Instead, we will chose to find the minimum for each comparison:</div>
<pre><code>// A step by step explanation taking the first line as an example.
// Step 1: Find out if a < b and turning it into a mask: we did that earlier with a_less_b.
// Step 2: Create our pair: a ^ b
// Step 3: Select either our pair or 0. If a_less_b == -1 then our pair is selected else 0.
// Step 4: Push or Pop the number.
// 	If a > b then it is a push of b since our pair has been canceled, resulting in b ^ 0 == b.
// 	Else it is a pop of b since our pair has been selected, resulting in b ^ pair == a.
int	ab_min	= b ^ ((a ^ b) & a_less_b);
int	ac_min	= c ^ ((a ^ c) & a_less_c);
int	bc_min	= c ^ ((b ^ c) & b_less_c);
</code></pre>
<div class="text-block">The result is 3 integers which two of them are equal and smaller than the third. This will be true for any case:

If a is the minimum then a == ab_min == ac_min and the median will be bc_min.
If b is the minimum then b == ab_min == bc_min and the median will be ac_min.
If c is the minimum then c == ac_min == bc_min and the median will be ab_min.

We just need to XOR the result to cancel out the minimum and the median will be the last value standing:</div>
<pre><code>return ab_min ^ ac_min ^ bc_min;
</code></pre>
<div class="text-block">This code results in a completely branchless assembly that has the other advantage of being smaller in size:</div>
<pre><code>	.globl	median_branchless
	.type	median_branchless, @function
median_branchless:
.LFB12:
	.cfi_startproc
	cmp	edi, esi
	mov	eax, esi
	cmovle	eax, edi	// The branchless version uses conditional moves 
	cmp	edi, edx	// to avoid branch misprediction penalties.
	cmovg	edi, edx
	xor	eax, edi
	cmp	esi, edx
	cmovg	esi, edx
	xor	eax, esi
	ret
	.cfi_endproc
</code></pre>
<div class="text-block">Learning branchless techniques teaches you to think differently about control flow and its impact on generated assembly. While not always faster, these patterns give you another optimization strategy when performance matters, and they often make code more amenable to vectorization.

Perhaps most valuable is the broader lesson: checking the actual assembly output is one of the fastest ways to identify performance bottlenecks that aren't obvious from source code alone.

<div class="text-block">Link to the <a href="https://github.com/BolvicBolvicovic/branchless">project</a>.
You can contact me at victor.cornille@gmail.com.</div>
`;

const	file_portfolio_kfs	= `
<h1>Kernel From Scratch</h1>
<div class="text-block">KFS is a x86_32 kernel for study purposes from the eponym 42 specialization suite of projects. It is the first kernel I have written. You can look at the project on my <a href="https://github.com/BolvicBolvicovic/kfs">github</a>.
The suite is composed of 10 projects, each one of them adding a new functionality to the kernel. I have validated the 4th first and finished the 5th.</div>
<h3>Introduction</h3>
<h4>Emulation</h4>
<div class="text-block">We are free to choose whatever software for emulating the device that will run the kernel. It is proposed to use KVM but I opted for <a href="https://www.qemu.org/">QEMU</a> as I thought it was easy to use when I started the project. Probably that a tutorial that I found on <a href="https://wiki.osdev.org/Expanded_Main_Page">OSDev</a> used it and I did the same.</div>
<h4>Language</h4>
<div class="text-block">Just like for the emulation software, we are free to choose the language we want. C is the default option as it does not need anything special to make its base features work. C++ has new and delete keywords that cannot be used (and I am not the biggest fan of C++ anyway). Rust seems attractive but most of the information online is written for C/C++. I have no knowledge of Zig. So I decided to go for C with some ASM stubs here and there.</div>
<h4>Toolchain</h4>
<div class="text-block">I created a small bash script to get the <a href="https://newos.org/toolchains">toolchain</a> and build with a Makefile the image of the OS that is used with QEMU. I also use grub2-common, grub-pc-bin and xorriso.</div>
<h3 id="portfolio/kfs/grub-boot-screen">kfs-1 / Grub, Boot and Screen</h3>
<div class="text-block">The first project is the simplest one by far. It is a kind of setup project where you get started with your kernel that won't be able to do anything but to run. It must boot with GRUB and write characters on the screen.

The only "compicated" thing is to understand why and how to setup the higher-half kernel. A higher-half kernel is a kernel mapped to the high address space, over 0xC0000000 (around 1GB in the RAM). That facilitates the creation of a fixed size user virtual address space for a user process. We want it to be fixed size in case the kernel grows (which is the case anytime you add more code or if you need allocations that are persistant across processes and that need full privileges to be accessed).

The virtual memory layout in the RAM looks like this:
	- 0x00000000-0x00100000 (0-1MB): Bootloader + some interractions with the virtual hardware (i.e. the VGA buffer at 0xB8000 where we will write our first characters to the screen)
	- 0x00100000: Start of identity mapped kernel. Identity mapped means that the virtual address of the kernel matches its physical address. We copy this to the higher address space before giving this address space to the user.
	- 0x00100000-0xC0000000 (1MB-1GB): User space. This is where the heap, the stack and a user program is stored.
	- 0xC0000000-0xFFFFFFFF (1GB-4GB): Kernel space. This is where the kernel and the page directory are stored.</div>
<pre><code># kernel/start.s (Note that I use the default GCC AT&T syntax to use the same compiler.
# I did not give much of a thought. I know that the intel syntax is more common.)

# Maps the current page table that maps the bootloader and the kernel
# to both address 0x00000000 and 0xC0000000 because switching directory
# table does not change the address of the next instruction that was mapped
# in the previous directory table. Meaning that the CPU would execute code
# that is not mapped, leading to an interruption that would halt the CPU.
# That way we get the virtual memory layout we want for our kernel.

movl $(boot_page_table0 - KERNEL_VIRT_BASE + PRIV), boot_page_dir - KERNEL_VIRT_BASE
movl $(boot_page_table0 - KERNEL_VIRT_BASE + PRIV), boot_page_dir - KERNEL_VIRT_BASE + 768 * 4
# Same address here ^^^^^^^^^^^ goes to both page 0 and 768 of boot_page_dir (we do *4 because pages are 4 bytes wide). 

# The other thing I have not mentioned that we want in our setup is that
# our page directory is said "recursive". Now the only thing that recursive means here,
# is that the page directory is mapped within itself, at the end.
# The reason we want to do that is that we can then easily access it
# at 0xFFFFF000 and its pages at 0xFFC00000 making it consisant across each process
# (that have their own page directory but with the kernel mapped at the same place).
# As I said, we just need to map the physical address of the directory at the end of itself:

movl $(boot_page_dir - KERNEL_VIRT_BASE + PRIV), boot_page_dir - KERNEL_VIRT_BASE + 1023 * 4
# 1023 being the last index for the last entry in the directory table.
</code></pre>
<div class="text-block">There is not so much more to it if you do not handle the bonus parts (which I did but I do not want to talk about it now since I will cover it in the <a href="#portfolio/kfs/interrupts">Interrupts</a> section since the PS/2 keyboard emulated by QEMU is connected to the PIC which uses interrupts.</div>
<h3 id="portfolio/kfs/gdt-stack">kfs-2 / Global Descriptor Table & Stack</h3>
<div class="text-block">The second project is also about doing some setup, mainly the Global Descriptor Table (GDT) which is a legacy way of representing memory and that needs to be set up for backward compability.</div>
<h4>The Stack</h4>
<div class="text-block">The kernel stack can be setup in the linker or reserved in the post-bootloader file (in my case, kernel/start.s). It is nothing special, just reserve a big array of bytes for the stack and set it up after the jump (after switching dir).</div>
<pre><code># kernel/start.s

# ...

.section .boot.stack, "aw", @nobits
.global stack_top
.global stack_bottom
stack_bottom:
.skip       0x10000
stack_top:
# creating two labels at the bottom and at the top of the stack 
# that can be used throughout the whole the kernel

# ...
	# Right before the jump 
	lea higher_half, %ecx
	jmp *%ecx

.section .text
.align 4
# Higher Half Kernel
higher_half:
	# Reload cr3 forces a TLB flush and changes take effect
	movl %cr3, %ecx
	movl %ecx, %cr3

	# Setting up the stack
	mov  $stack_top, %esp

# ...
</code></pre>
<h4>The GDT</h4>
<div class="text-block">The Global Descriptor Table is the table that holds information about memory segments. To quote the <a href="https://wiki.osdev.org/Segmentation">segment page</a> from OSDev: "Segmentation is considered obsolete memory protection technique in protected mode by both CPU manufacturers and most of programmers. It is no longer supported in long mode. [It] is required to get protected mode working; also 64 bit GDT is needed to enter long mode (long mode does not exist in x86_32) and segments are still used to jump from long mode to compatibility mode and the other way around.". As I mentionned earlier, just backward compatibility.

It has a lenght of 5 to 6 gdt_gate_t entry (Note that the name is arbitrary) depending if you use a Task State Segment (TSS). Don't worry about the latter, we'll talk about it in the <a href="#portfolio/kfs/processes">Processes</a> section.
The struct gdt_gate_t looks like this:</div>
<pre><code>// drivers/descriptor/descriptor.h

// Basically, it is composed of:
// 	- a start adress of a segment split in 3 parts
// 	- some flags (granularity of the segment (1 byte or 4kB), access)
typedef struct {
	uint16_t	limit_low;
	uint16_t	base_low;
	uint8_t		base_middle;
	uint8_t		access;
	uint8_t		granularity;
	uint8_t		base_high;
} __attribute__((packed)) gdt_gate_t; // Don't mind about that, it just means that the compiler does not add padding to the structure to align it.
</code></pre>
<div class="text-block">The 5 mendatory segments to set up are:
	- the NULL segment
	- the kernel code segment
	- the kernel data segment
	- the user mode code segment
	- the user mode data segment

The bonus is about a minimalistic shell to be able to run tests/reboot/halt. There is not much to it.</div>
<h3 id="portfolio/kfs/memory">kfs-3 / Memory</h3>
<div class="text-block">Now things start to be interesting. We are now setting up the memory so that we can use dynamically the whole RAM and be able to use it later for multitasking.</div>
<h4>Memory layout</h4>
<div class="text-block">Since we are targeting an x86_32 machine, our address space seems to be limited to UINT_MAX. (There is a way to extend that, I won't cover it because I did not implemented it.) Now, what does it mean that our address space is limited to UINT_MAX, what is an address even, what is the RAM?

The RAM is the Random Access Memory that is basically where any process on a computer runs. The RAM also holds the heap, the stack and the data of any process while it runs. In opposition to the disk where files and other software entities persist after a shutdown, the RAM starts from 0 every time. Why use the RAM then? It is faster by orders of magnetude to do read/write on the RAM than on the disk.

Now that we covered quickly what the RAM is, we can get an idea of what is an address: it simply is where a byte in the RAM is stored. The 32 in x86_32 means that our registers cannot take data wider than 32 bits (SIMD aside). Which means that our address are 32 bits wide and that explains the UINT_MAX limit it has. The address space is the totality of the addresses between 0 and UINT_MAX.

In Real Mode, an address has two part:
	- a segment
	- an offset into that segment

And that's it. It points directly to physical memory without any protection of any kind. It means that any process can access that memory. It uses the concept of segmentation which I talked about previously in the <a href="#portfolio/kfs/gdt-stack">GDT section</a>. It is depracated and in facts, when the bootloader runs the _start function, it has already done the switch to protected mode.

In Protected mode, an address is made of three parts:
	- an index in the page directory
	- an index in a page table of that directory
	- an offset into the physical frame mapped to that table

The first thing you might wonder is: what is this page thing? Quoting <a href="https://wiki.osdev.org/Paging">OSDev</a>: "Paging is a system which allows each process to see a full virtual address space, without actually requiring the full amount of physical memory to be available or present. 32-bit x86 processors support 32-bit virtual addresses and 4-GiB virtual address spaces, and current 64-bit processors support 48-bit virtual addressing and 256-TiB virtual address spaces." Since each process has it's own directory, it also allows different processes to run at the same time, referencing the same addresses but mapped to different physical frames, ensuring that they cannot access to each other's physical memory. On x86, paging is handled by the hardware component called Memory Management Unit (<a href="https://wiki.osdev.org/Memory_Management_Unit">MMU</a>).

Now that you have an understanding of what paging is, what about the table and directory parts? Both of their entries are 4 bytes wide and are split in two parts:
	- the address of the table/frame it is pointing to
	- a bunch of flags that rule how the table/frame can be accessed
<pre><code>// This is not in a file since in practice, I do not need to set every bits. 

typedef	unsigned int	pdir_entry;	// Note: the differences for the masks between a directory entry
typedef unsigned int	ptable_entry;	// and a table entry are only for 4MB pages.

#define	ADDRESS		0xFFFFF000	// 31-12 Note that it is a virtual address
#define	AVAILABLE	0x00000F40	// 11-8 && 6
#define	PAGE_SIZE	0x00000080	// 7 (0 == 4KB, 1 == 4MB) Note that these masks are for 4KB pages
#define ACCESSED	0x00000020	// 5 (0 == not read, 1 == read)
#define CACHE_DISABLED	0x00000010	// 4 (0 == cache enabled, 1 == cache disabled)
#define	WRITE_THROUGH	0x00000008	// 3 (0 == write-back, 1 == write-through)
#define USER_SUPERVISOR 0x00000004	// 2 (0 == supervisor only, 1 == full access)
#define READ_WRITE	0x00000002	// 1 (0 == RO, 1 == RW)
#define	PRESENT		0x00000001	// 0 (0 == not present, 1 == present)
</code></pre>
<div class="text-block">In most cases we only care about the three last flags and the address. Which means in practice that if one wants to get the address of the table, one just does:</div>
<pre><code>pdir_entry*	dir = 0xFFFFF000;	// Recursive page table address
uint32_t	virt_addr = 0x12345678;	// A virtual address we want to access;

#define PAGE_DIR_INDEX(ADDR) (((ADDR) >> 22) & 0x3FF)	// Helper to get the directory index
#define PAGE_TAB_INDEX(ADDR) (((ADDR) >> 12) & 0x3FF)	// Helper to get the table index

pdir_entry	dir_entry	= *(dir + PAGE_DIR_INDEX(virt_addr));
ptable_entry*	table		= (ptable_entry*)(dir_entry & ADDRESS);	// You can set flags here if you want
ptable_entry	tab_entry	= *(table + PAGE_TAB_INDEX(virt_addr));
uint32_t	phys_frame_addr	= (tab_entry & ADDRESS) + (virt_addr & 0xFFF);	// Note that you cannot write to that address since paging is enabled. You need to map it and uses its virtual address.
</code></pre>
<div class="text-block">If you want to apply the changes you do to the directory, you need to reload it by passing its address to the CR3 register.
<pre><code>// In memory/vmm/vmm.c
extern void switch_dir(uint32_t dir);	// Some assembly stub:
					// mov	4(%esp), %eax
					// mov	%eax, %cr3
					// ret
// ...

void
init_vmm(void)
{

// ...

	switch_dir(PAGE_DIR[1023] & ~0xFFF); // ~0xFFF == 0xFFFFF000 == ADDRESS
}
</code></pre>

I will not talk about Long Mode since it is reserved for x64.
Now that you have an understanding of what paging is, let's dig down on how all this memory is managed.</div>
<h4>Physical Memory Manager</h4>
<div class="text-block">Before handling the virtual memory, we need to be able to handle physical memory, meaning to map it into some smaller abstraction, one where a byte must be represented by something smaller. I have 32GB of RAM, I don't want to use these 32GB to map themselves.

Furthermore, as I mentioned earlier, we are limited by our 32 bits data representations which makes the maximum 4GB and not 32.

One way to do that is to use a bitmap. It turns the size of our map from 4GB to 500MB. Much better but as I mentionned earlier, we only have 4GB of virtual memory which some belongs to the user process and we want to minimize that cost.

To solve that problem, we can take advantage of the size of a page. A page maps 4KB of memory. We can decide that 1 bit of our bitmap maps a frame of 4KB. If the bit is set, the frame is allocated. Otherwise, it is not. We go from 500MB to 125MB, which is easily handled by the paging system.</div>

Turning bits into actual address is now trivial:
<pre><code>// memory/pmm/pmm.c

#define	PAGE_SIZE	0x1000				// 4KB
#define PMM_BLOCK_SIZE	PAGE_SIZE

// ...

int	frame = mmap_find_first_free_s(nb_blocks);	// returns an index of the bitmap or -1

if (frame == -1) return 0;				// Return null address on error

for (size_t i = 0; i < nb_blocks; i++)
{
	mmap_set(frame + i);				// Set each frame in the map
}

_memory_used_blocks += nb_blocks;			// Counting the allocated space for boundry purpose

return (unsigned int)(frame * PMM_BLOCK_SIZE);		// Creating the address based on PMM_BLOCK_SIZE
</code></pre>
<h4>Virtual Memory Manager</h4>
<div class="text-block">// TODO</div>
<h4>Memory allocators</h4>
<div class="text-block">// TODO</div>
<h3 id="portfolio/kfs/interrupts">kfs-4 / Interrupts</h3>
<div class="text-block">// TODO</div>
<h4>Interrupt Service Routine</h4>
<div class="text-block">// TODO</div>
<h4>Interrupt Request</h4>
<div class="text-block">// TODO</div>
<h3 id="portfolio/kfs/processes">kfs-5 / Processes</h3>
<div class="text-block">// TODO</div>
<h4>Cooperative Multitasking</h4>
<div class="text-block">// TODO</div>
<h4>Preemptive Multitasking</h4>
<div class="text-block">// TODO</div>

<div class="text-block">Link to the <a href="https://github.com/BolvicBolvicovic/kfs">project</a>.
You can contact me at victor.cornille@gmail.com.
Written by me, typo errors caught by AI.</div>
`;

const	file_portfolio_esp8266_NON_SDK_NON_OS	= `
<h1>NON SDK NON OS ESP8266 Documentation</h1>

<h3>Introduction</h3>
<div class="text-block">This little journey started when I first flashed my arduino code into my NodeMCU from a WSL2 instance and waited around 30 seconds to see the chip's LED flashing. When I tried the same thing from a Linux distribution, it still took around 10 seconds which is way too slow in my humble opinion to flash such a simple program.

The first thing I did was to look at how big the arduino's SDK (Software Development Kit) is and it turned out that it made my program bigger than 300kB. A little overkill to make a LED blink. So I decided to try turning the LED on from bare-bone by writting directly to the concerned registers. I found out that it was more difficult than I thought since the latest documentation I found for the <a href="https://github.com/espressif/ESP8266_NONOS_SDK">esp8266_NON_OS_SDK</a> was for the version 1.5.4 (I did not find the <a href="https://www.fdi.ucm.es/profesor/mendias/TFE/recursos/NodeMCU/2c-esp8266_non_os_sdk_api_reference_en.pdf">latest version</a> until later). Further more, I wanted to start from the bare minimum, which is not what the esp8266_NON_OS_SDK offers (since it provides a bunch of helpers that I don't know the quality of).

After some work and research, I found the repo of a certain <a href="https://github.com/cnlohr/nosdk8266">cnlohr</a> which showed me exactly how to get started. The size of my program dropped below 1kB, making it more than 300 times smaller than initially! It was also able to be flashed at lightning speed, enabling fast iterations and making that LED blink in the most straight forward fashion.

I then read the linker file <a href="https://github.com/espressif/ESP8266_NONOS_SDK/blob/master/ld/eagle.rom.addr.v6.ld">eagle.rom.addr.v6.ld</a> which contains the address of every ROM functions that thus cannot be altered and that are in the MCU. The usage of these fonctions was unclear for most of them and I could not find their signature, making it harder to guess. So I decided to reverse-engineer (which was a first for me) a created a <a href="https://github.com/BolvicBolvicovic/esp8266_NON_SDK_NON_OS/blob/main/lib/esp8266.h">header file</a> that gathers what I found and understood by reading the disassembled ROM functions.

Below are a collection of ideas I got by doing that resverse-engineering, classified by groups of function.</div>
<h3>ETS Espressif's internal library (ets_* functions)</h3>
<div class="text-block">// TODO</div>
<h3>Memory management functions (mem* functions)</h3>
<div class="text-block">// TODO</div>
<h3>XTensa OS functions (_xtos_* functions)</h3>
<div class="text-block">// TODO</div>
<h3>ROM functions / hardware handlers (rom_* functions)</h3>
<div class="text-block">// TODO</div>

<div class="text-block">Link to the <a href="https://github.com/BolvicBolvicovic/esp8266_NON_SDK_NON_OS">project</a>.
You can contact me at victor.cornille@gmail.com.</div>
`;

const	saved_history		= localStorage.getItem("history");
const	saved_history_head	= localStorage.getItem("history_head");
const	saved_directory		= localStorage.getItem("current_dir");
const	saved_hints_enabled	= localStorage.getItem("hints_enabled");

const	unsafe_directory	= get_dir(saved_directory.split("/"), FS);
/* VARIABLES */

let	current_dir		= unsafe_directory !== unknown_directory ? unsafe_directory : FS;
let	history_head		= saved_history_head ? saved_history_head : 0;
let	history			= saved_history
					? RingBuffer.fromArray(JSON.parse(saved_history), history_head)
					: new RingBuffer();
let	reading			= false;
let	hints_enabled		= saved_hints_enabled === "1" || saved_hints_enabled === null;

/* HELPERS */

/* Name: autocomplete
 * Description: takes a string and an array of string as arguments.
 * Finds the needle in the haystack else returns "".
 * Return type: string
 * */
function	autocomplete(needle, haystack) {
	const	matches = haystack.filter(w => w.startsWith(needle));

	if (matches.length === 0) return "";
	if (matches.length === 1) return matches[0].slice(needle.length);

	let	prefix = matches[0];

	for (let i = 1; i < matches.length; i++) {
		const	word	= matches[i];
		let	j	= 0;

		for(; j < prefix.length && j < word.length && prefix[j] === word[j]; j++);

		prefix = prefix.slice(0, j);
	}

	return prefix.slice(needle.length);
}

/* Name: handle_path_hash
 * Description: handles the path's hash at initial load and on back/forward buttons.
 * Return type: none
 * */
function	handle_path_hash() {
	const	hash = window.location.hash;
	
	if (!hash) return;

	const	no_hash_hash	= hash.replace("#", "");
	const	path		= no_hash_hash.split("/");
	const	unsafe_file	= get_file(path);

	if (unsafe_file === unknown_file) {
		if (path.length !== 0 && path[-1] !== current_dir.pwd)
			cd(get_dir(path, FS), no_hash_hash);
		return;
	}

	open_reader(unsafe_file, no_hash_hash, "");
}

/* Name: build_line_tag
 * Description: builds the tag for the start of a line based on the current_dir.pwd.
 * Return type: string
 * */
function	build_line_tag() {
	const	line_tag_start	= "[victor_cornille@my_website ";
	const	line_tag_end	= "]$ ";
	
	return line_tag_start + (current_dir.pwd !== "" ? current_dir.pwd : "/") + line_tag_end;
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
	
	if (first_dir === dir.pwd || first_dir === "")
		return get_dir(path.slice(1), dir);

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
			return file_posts_branchless;
		case "whoami":
			return file_whoami;
		case "kfs":
			return file_portfolio_kfs;
		case "esp8266_NON_SDK_NON_OS":
			return file_portfolio_esp8266_NON_SDK_NON_OS;
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
			return open_reader(get_file(path), args, current_dir.pwd)
		case "ls":
			if (args == "") return ls(current_dir, 0);
			return ls(get_dir(path, current_dir), 0);
		case "cd":
			if (args == "") return cd(FS, "");
			if (args.startsWith("/")) return cd(get_dir(path, FS), args);
			// TODO: replace pwd with an actual method to build the path.
			return cd(get_dir(path, current_dir), current_dir.pwd + args);
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

	if (!hints_enabled) return "";
	
	return "\nHint: You have cleared the terminal. You cannot scroll back. If you wish to see the welcome message, reload the page.";
}

/* Name: ls
 * Description: returns the list of all files and folders in the chosen directory.
 * Defaults to current_dir.
 * Usage: ls <DIR>
 * */
function	ls(dir, mode) {
	if (dir == unknown_directory)
		return unknown_directory;

	let	fs_list = [...dir.files];

	if (mode === 1) {
		for (let i = 0; i < dir.dir.length; i++) {
			fs_list.push(dir.dir[i].pwd);
		}

		return fs_list.join(" ");
	} else if (mode === 2) {
		let	dirs = [];

		for (let i = 0; i < dir.dir.length; i++) {
			dirs.push(dir.dir[i].pwd);
		}

		return dirs.join(" ");
	}

	for (let i = 0; i < dir.dir.length; i++) {
		const	colored_dir = `<span style="color: ${dusty_blue};">${dir.dir[i].pwd}</span>`;
		fs_list.push(colored_dir);
	}
	
	// TODO: find a way to make the color work with the sort.
	// fs_list.sort();
	if (!hints_enabled) return fs_list.join(" ");

	return fs_list.join(" ") + `

Hint: You have listed the content of <span style="color: ${dusty_blue};">${dir.pwd}</span>.
<span style="color: ${dusty_blue}">Folders</span> are in blue and files are in white.
You can choose to read a file by typing <span style="color: ${yellow};">read name_of_the_file</span> or move to a folder by typing <span style="color: ${yellow};">cd name_of_the_folder</span>.
Do not forget to hit enter to execute the command!
 `;
}

/* Name: cd
 * Description: change the working directory.
 * Usage: cd <DIR>
 * */
function	cd(dir, not_split_path) {
	if (dir == unknown_directory)
		return unknown_directory;

	current_dir = dir;
	terminal_input_prompt.textContent = build_line_tag();
	window.location.hash = not_split_path;
	localStorage.setItem("current_dir", not_split_path);

	if (!hints_enabled) return "";
	
	return `
Hint: You have moved to <span style="color: ${dusty_blue};">${dir.pwd}</span>.
You can see the current folder you are in by looking at the last word of ${terminal_input_prompt.textContent}.
You can choose to list everything in the folder by typing <span style="color: ${yellow};">ls</span> or you can read/open a file by typing <span style="color: ${yellow};">read name_of_the_file</span>.
Do not forget to hit enter to execute the command!
 `;

}

/* Name: open_reader
 * Description: opens a file in a reader.
 * In the reader, you can:
 * 	- scroll with the mouse, the pad or the arrows up and down.
 * 	- quit by hitting q.
 * Usage: read <FILE>
 * */
function	open_reader(file, path, file_pwd) {
	if (file === unknown_file)
		return unknown_file;

	terminal_input.contentEditable = false;
	reader_output.innerHTML = file;
	reading = true;
	terminal.style.display = "none";
	reader.style.display = "";
	reader.focus();

	window.location.hash = (file_pwd !== "" ? file_pwd + "/" : "") + path;
	
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
	window.location.hash = current_dir.pwd;
}


/* Name: latest
 * Description: shortcut for read <LATEST POSTED FILE>.
 * Usage: latest
 * */
function	latest() {
	return open_reader(file_posts_branchless, "posts/branchless", "/");
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
 *	- toggle_hints	: toggle hints on if it was off and vice-versa.
 *	- clear		: clears the entire history. Care, you will not be able to scroll back.
 *	- clear_cache	: clears the history cache and the hints preference.
 *	- help	[CMD]	: prints all information about the command [CMD].
 * */`;
	}
}

/* INIT MAIN */
terminal_input_output_welcome_message.innerHTML	= welcome_message;
terminal_input_prompt.textContent		= build_line_tag();

window.addEventListener("DOMContentLoaded", handle_path_hash);
window.addEventListener("hashchange", handle_path_hash);

reader.addEventListener("click", () => {
	const	selection = window.getSelection();

	if (selection.toString().length !== 0 && reading) return;
	
	reader.focus();
});

terminal.addEventListener("click", (e) => {
	const	selection = window.getSelection();

	if (selection.toString().length !== 0 && reading) return;
	
	terminal_input.focus();
});

if (!is_mobile) {
	terminal_input.focus();
}

terminal_input.addEventListener("keydown", (e) => {
	if (e.key === "Tab") {
		e.preventDefault();

		let	command		= terminal_input.innerText.trim();

		if (!command) return;

		const	parsed_cmd	= command.split(" ").slice(0, 2);

		if (parsed_cmd.length > 2) return;

		let	ls_mode		= 0;

		switch (parsed_cmd[0]) {
			case "ls":
			case "cd":
				ls_mode = 2;
				break;
			case "read":
				ls_mode = 1;
				break;
		}
		
		if (ls_mode === 0) return;

		const	response_line	= document.createElement("div");
		const	command_line	= document.createElement("div");
		let	ls_res;

		if (parsed_cmd.length == 2) {
			const	path	= parsed_cmd[1].split("/");
			const	dir_path= path.length > 1 ? path.slice(0, -1) : path;
			const	dir	= get_dir(dir_path, current_dir);
			let	new_cmd;

			if (dir === unknown_directory) {
				ls_res = ls(current_dir, ls_mode);
				new_cmd = command + autocomplete(parsed_cmd[1], ls_res.split(" "));
			} else {
				ls_res = ls(dir, ls_mode);
				new_cmd = command + autocomplete(path[path.length - 1], ls_res.split(" "));
			}
			terminal_input.innerText = new_cmd;
			place_caret_at_end(terminal_input);
		} else {
			ls_res = ls(current_dir, ls_mode);
		}
		command_line.textContent= terminal_input_prompt.textContent + command; 
		terminal_output.appendChild(command_line);
		response_line.innerHTML = ls_res;
		terminal_output.appendChild(response_line);
		terminal.scrollTop = terminal.scrollHeight;
		return;
	}

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

		if (!command) return;

		response_line = document.createElement("div");

		history.pushBack(command);
		response_line.innerHTML = run_command(command);
		terminal_output.appendChild(response_line);
		terminal_input.innerText = "";

		localStorage.setItem("history", JSON.stringify(history.toArray()));
		localStorage.setItem("history_head", history.head);

		terminal.scrollTop = terminal.scrollHeight;
		return;
	}
	
	if (e.key === "ArrowUp") {
		e.preventDefault();

		const	previous_command = history.readPrevious();

		if (previous_command === null) return;

		terminal_input.innerText = previous_command;
		place_caret_at_end(terminal_input);
		return;
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
		return;
	}
});

reader.addEventListener("keydown", (e) => {
	if (e.key === "q" ) {
		e.preventDefault();
		close_reader();
		reading = false;
	}
});
