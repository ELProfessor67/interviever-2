import { exec } from'child_process';
import path from 'path';
import fs from 'fs';
/**
 * Convert WEBM to WAV using ffmpeg command
 * @param {string} inputPath - Path to the input .webm file
 * @param {string} outputDir - Directory to save the output file
 * @returns {Promise<string>} - Resolves with the output file path
 */
export function convertWebmToWav(inputPath) {
    return new Promise((resolve, reject) => {
        const input = path.join(process.cwd(),inputPath);
        const output = input.replace(".webm",'.wav')

        const command = `ffmpeg -i "${input}" -acodec pcm_s16le -ar 44100 -ac 2 "${output}"`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error('Error:', stderr);
                reject(error);
            } else {
                console.log('Conversion completed:', output);
                fs.unlinkSync(input);
                resolve(output);
            }
        });
    });
}


