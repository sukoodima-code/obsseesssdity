/**
 * Generates demo audio (short WAV tones) and placeholder cover JPEGs
 * so the player works without real Suno exports.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const songsPath = path.join(root, "src", "music", "songs.ts");
const musicDir = path.join(root, "public", "music");
const coversDir = path.join(root, "public", "covers");

const songsText = fs.readFileSync(songsPath, "utf8");
const audioFiles = [...songsText.matchAll(/audioUrl:\s*"\/music\/([^"]+)"/g)].map((m) => m[1]);
const coverFiles = [...songsText.matchAll(/coverUrl:\s*"\/covers\/([^"]+)"/g)].map((m) => m[1]);

function createWavBuffer(durationSec, frequencyHz, sampleRate = 44100) {
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const fade = Math.min(1, i / (sampleRate * 0.05), (numSamples - i) / (sampleRate * 0.08));
    const sample = Math.sin(2 * Math.PI * frequencyHz * t) * 0.22 * fade;
    const intSample = Math.max(-32767, Math.min(32767, Math.floor(sample * 32767)));
    buffer.writeInt16LE(intSample, 44 + i * 2);
  }

  return buffer;
}

// Minimal valid 1×1 JPEG (dark purple)
const MIN_JPEG = Buffer.from(
  "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////2wBDAf//////////////////////////////////////////////////////////////////////////////////////wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
  "base64"
);

fs.mkdirSync(musicDir, { recursive: true });
fs.mkdirSync(coversDir, { recursive: true });

let audioCount = 0;
for (let i = 0; i < audioFiles.length; i++) {
  const name = audioFiles[i];
  const freq = 220 + (i % 12) * 55;
  const wav = createWavBuffer(30, freq);
  const outPath = path.join(musicDir, name.replace(/\.mp3$/i, ".wav"));
  fs.writeFileSync(outPath, wav);
  audioCount++;
}

let coverCount = 0;
for (const name of coverFiles) {
  fs.writeFileSync(path.join(coversDir, name), MIN_JPEG);
  coverCount++;
}

console.log(`Created ${audioCount} demo tracks in public/music/`);
console.log(`Created ${coverCount} placeholder covers in public/covers/`);
