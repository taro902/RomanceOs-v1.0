document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('terminal');
    const history = document.getElementById('history');
    const commandInput = document.getElementById('command-input');
    const prompt = document.querySelector('.prompt');

    const fileSystem = {
        '~': { 
            'surat_cinta_untuk_starla.txt': `
Hai Apiw impostor,

kamu bisa kan kesini? pinter apiw, aku tulis ini di jam 1:10 Am,
aku yakin aku orang aneh, karna aku buat semua ini buat Kirim ke Apiw aja,
aku mau tau nanti gimana pas perjusa sesibuk apa, semangat ya apiw yang baru kenal udah ledek ledekan.

kamu tau kenapa tadi malem aku gak bales? (aku yakin kamu gak mau tau paling aku yang nanya aku yang jawab hehehehe) aku tadi malem sebenrnya lgi ketiduran itu,
tapi gakpapa yang penting udh kenalan hehe.

aku introvert > kamu introvert jadi >< jadinya apa dong, nnti pasti klo ngobrol langsung bakal canggung banget tapi gakpapa, paling aku yg ledek kamu duluan (pls jgn diemin akuh hehe) nnti di bales, gitu aja terus, kamu lucu, asik, baik, jago gambar, hebat, cocok banget masuk dkv, semangat ya di dkv nya, Cieee pacar sasuke 

yaudah aku mau lanjut nyari hostingan ntar aku kirim ini ke kamu biar kamu baca sama nilai, Sejujurnya aja ya Xixixi

babayy Apiww (impostor), aku mau masak Indomie rebus, laper hehe.

- Agen Kenzi A.A yang baik hati (sasuke) 
`,
            'alasan_kenapa.txt': `
=== DAFTAR ALASAN KENAPA OS INI DIBUAT ===

1. Karena 'Hello, World!' terlalu membosankan.
2. Stok meme di galeri kenzi udah habis.
3. Kucingku bilang ini ide yang bagus walaupun 2 hari persiapannya.
4. Karena kamu Seperti nya tipe orang yang bisa menghargai usaha orang aneh seperti ini.
5. Karena aku kehabisan alasan.
`,
            'rahasia': { 
                'pesan_tersembunyi.txt': `
Psst... kamu nemuin pesan ini apiww!
Pesan rahasianya adalah: Bakal ada waktunya dan Hari,tanggal,tahun yang perfect buat kedepannya..
`
            }
        }
    };

    const gombalan = [
        "serius aku gak bisa gombal",
        "beneran aku gak bisa",
        "mungkin klo salto juga paling jatoh",
        "Hai apiw apa kabar, bosen ga"
    ];

    let currentPath = '~';
    let commandHistory = [];
    let historyIndex = -1;

    const print = (text, className = 'output-response') => {
        const div = document.createElement('div');
        div.className = className;
        div.innerHTML = text.replace(/\n/g, '<br>');
        history.appendChild(div);
        terminal.scrollTop = terminal.scrollHeight;
    };

    const printCommand = (cmd) => {
        const promptText = `[User@RomanceOS ${currentPath}]$`;
        print(`${promptText} ${cmd}`, 'output-command');
    };
    
    // Prosesor Perintah
    const processCommand = (cmd) => {
        printCommand(cmd);
        if (cmd.trim() === '') return;

        commandHistory.unshift(cmd);
        historyIndex = -1;

        const [command, ...args] = cmd.trim().split(/\s+/);

        switch (command.toLowerCase()) {
            case 'help':
                print(`
<span class="output-system">===== RomanceOS v1.0 Help Menu =====</span>
<span class="output-help-cmd">help</span><span class="output-help-desc">: Menampilkan menu bantuan ini.</span>
<span class="output-help-cmd">ls</span><span class="output-help-desc">: Menampilkan isi direktori saat ini.</span>
<span class="output-help-cmd">cd [folder]</span><span class="output-help-desc">: Pindah ke direktori lain (e.g., 'cd rahasia').</span>
<span class="output-help-cmd">cd ..</span><span class="output-help-desc">: Kembali ke direktori sebelumnya.</span>
<span class="output-help-cmd">cat [file]</span><span class="output-help-desc">: Membaca isi file (e.g., 'cat surat_cinta_untuk_starla.txt').</span>
<span class="output-help-cmd">scan --mood</span><span class="output-help-desc">: Menjalankan pemindai mood rahasia.</span>
<span class="output-help-cmd">gombal</span><span class="output-help-desc">: Menghasilkan rayuan acak tingkat tinggi.</span>
<span class="output-help-cmd">connect</span><span class="output-help-desc">: Mencoba membuat koneksi ke WhatsApp.</span>
<span class="output-help-cmd">clear</span><span class="output-help-desc">: Membersihkan layar terminal.</span>
`);
                break;

            case 'ls':
                const currentDirContent = resolvePath(currentPath);
                if (typeof currentDirContent === 'object') {
                    const contentList = Object.keys(currentDirContent).map(item => {
                        return typeof currentDirContent[item] === 'object' ? `<span class="output-success">${item}/</span>` : item;
                    }).join('   ');
                    print(contentList);
                }
                break;

            case 'cd':
                const newPath = args[0];
                if (!newPath) {
                    currentPath = '~';
                } else if (newPath === '..') {
                    if (currentPath !== '~') {
                        const pathParts = currentPath.split('/');
                        pathParts.pop();
                        currentPath = pathParts.join('/') || '~';
                    }
                } else {
                    const targetPath = currentPath === '~' ? newPath : `${currentPath}/${newPath}`;
                    if (typeof resolvePath(targetPath) === 'object') {
                        currentPath = targetPath;
                    } else {
                        print(`cd: direktori tidak ditemukan: ${newPath}`, 'output-error');
                    }
                }
                updatePrompt();
                break;

            case 'cat':
                const filePath = currentPath === '~' ? args[0] : `${currentPath}/${args[0]}`;
                const fileContent = resolvePath(filePath);
                if (typeof fileContent === 'string') {
                    print(fileContent);
                } else {
                    print(`cat: file tidak ditemukan: ${args[0]}`, 'output-error');
                }
                break;

            case 'scan':
                if (args[0] === '--mood') {
                    print('<span class="output-system">Memindai gelombang otak... menganalisis senyuman...</span>');
                    setTimeout(() => print('<span class="output-success">Hasil Scan: Terdeteksi tingkat ke-lucu-an 99.9%. Disarankan untuk waspada terhadap pesona berlebih.</span>'), 1500);
                } else {
                    print(`scan: argumen tidak valid. Coba 'scan --mood'`, 'output-error');
                }
                break;
                
            case 'gombal':
                const randomIndex = Math.floor(Math.random() * gombalan.length);
                print(gombalan[randomIndex]);
                break;
            
            case 'connect':
                print('<span class="output-system">Mencoba membuat koneksi ke WhatsApp...</span>');
                setTimeout(() => {
                    print('<span class="output-success">Koneksi berhasil! Membuka di tab baru...</span>');
                    window.open('https://wa.me/6285117178779?text=Kenalin aku kenzi temennya apiw yang baru kenalan udh ledek ledekan', '_blank');
                }, 1000);
                break;

            case 'clear':
                history.innerHTML = '';
                break;

            default:
                print(`bash: perintah tidak ditemukan: ${command}. Coba ketik 'help'.`, 'output-error');
        }
    };

    // Helper untuk navigasi file system
    const resolvePath = (path) => {
        if (path === '~') return fileSystem['~'];
        const parts = path.replace(/^~\//, '').split('/');
        let current = fileSystem['~'];
        for (const part of parts) {
            if (current && typeof current === 'object' && part in current) {
                current = current[part];
            } else {
                return undefined;
            }
        }
        return current;
    };
    
    const updatePrompt = () => {
        prompt.textContent = `[User@RomanceOS ${currentPath}]$`;
    };

    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            processCommand(commandInput.value);
            commandInput.value = '';
        } else if (e.key === 'ArrowUp') {
            if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
                historyIndex++;
                commandInput.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
             if (historyIndex > 0) {
                historyIndex--;
                commandInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = -1;
                commandInput.value = '';
            }
        }
    });

    terminal.addEventListener('click', () => {
        commandInput.focus();
    });

    const bootSequence = [
        { text: 'Booting RomanceOS v1.0...', time: 1000 },
        { text: 'Initializing Feelings Protocol... OK', time: 1500 },
        { text: 'Compiling Compliments... DONE', time: 1000 },
        { text: 'Connecting to Network: Apiw (impostor)... <span class="output-success">SUCCESS</span>', time: 2000 },
        { text: 'Welcome, User.', time: 500 },
        { text: "Ketik 'help' untuk melihat daftar perintah.", time: 500 }
    ];

    let bootIndex = 0;
    function runBoot() {
        if (bootIndex < bootSequence.length) {
            print(bootSequence[bootIndex].text, 'output-system');
            setTimeout(runBoot, bootSequence[bootIndex].time);
            bootIndex++;
        } else {
            document.querySelector('.input-line').style.visibility = 'visible';
            commandInput.focus();
        }
    }
    
    document.querySelector('.input-line').style.visibility = 'hidden';
    runBoot();
});