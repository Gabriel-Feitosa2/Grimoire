/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useCallback, useState } from "react";
import { Button } from "../../ui/button";
import {
  DialogHeader,
  DialogTitle,
  DialogFooter,
  Dialog,
  DialogContent,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { npcInput } from "~/types";
import { api } from "~/trpc/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { UploadDropzone } from "~/utils/uploadthing";
import { useUploadThing } from "~/utils/uploadthing";
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";

interface NpcsProps {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  title: string;
  image: string;
  userId: string;
}

interface NpcsPageProps {
  npcs: NpcsProps[];
}

export default function NpcList({ npcs }: NpcsPageProps) {
  const [npc, setNpc] = useState<{
    title: string;
    description: string;
    image: string;
  }>({} as { title: string; description: string; image: string });
  const [createModalForm, setCreateModalForm] = useState(false);
  const [editModalForm, setEditModalForm] = useState(false);
  const [selectNpc, setSelectNpc] = useState<NpcsProps>({} as NpcsProps);
  const [disableButton, setDisableButton] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const router = useRouter();

  const create = api.npc.create.useMutation({
    onSuccess: () => {
      setLoading(false);
      router.refresh();
    },
    onError: () => {
      setLoading(false);
    },
  });

  const deleteNpc = api.npc.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const editNpc = api.npc.update.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const { startUpload, permittedFileInfo } = useUploadThing("imageUploader", {
    onClientUploadComplete() {
      setFiles([]);
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  return (
    <div className="p-4 text-white">
      <div className="flex justify-end pb-4">
        <Button onClick={() => setCreateModalForm(true)}>Criar NPC</Button>
      </div>
      <div className="flex items-center gap-4">
        {npcs.map((npc) => (
          <Card
            className="w-64  border-neutral-900 bg-neutral-900 text-white "
            key={npc.id}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="mb-2">{npc.title}</CardTitle>
                <div className="flex gap-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    className="h-5 w-6  cursor-pointer rounded-xl hover:border-neutral-700 hover:bg-neutral-700"
                    onClick={() => {
                      setEditModalForm(true), setSelectNpc(npc);
                    }}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                      <path
                        d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                        stroke="#ffffff"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-6  cursor-pointer rounded-xl hover:border-neutral-700 hover:bg-neutral-700"
                    onClick={() => {
                      deleteNpc.mutate(npc.id);
                      router.refresh();
                    }}
                  >
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17"
                        stroke="#ffffff"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </div>
              </div>
              <CardDescription>
                <Image
                  alt="npc image"
                  src={npc.image}
                  width={180}
                  height={180}
                  className="h-44 w-44 rounded"
                />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{npc.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={createModalForm} onOpenChange={setCreateModalForm}>
        <DialogContent className=" min-h-96 text-white sm:max-w-[425px]">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              setLoading(true);
              const res = await startUpload(files);
              const body = {
                title: npc.title,
                description: npc.description,
                image: res?.[0]?.url,
              };

              create.mutate(body);
              setCreateModalForm(false);
              router.refresh();
            }}
          >
            {loading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline h-8 w-8 animate-spin fill-purple-600 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <>
                {" "}
                <DialogHeader>
                  <DialogTitle>Crie um NPC</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      id="name"
                      placeholder="Nome do NPC"
                      className="col-span-3 border-neutral-800 bg-neutral-800"
                      onChange={(e) =>
                        setNpc((parameters) => ({
                          ...parameters,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div
                    {...getRootProps()}
                    className="flex cursor-pointer justify-center border p-1"
                  >
                    <input {...getInputProps()} />
                    <div>
                      {files.length > 0 && <p>Upload {files.length} files</p>}
                    </div>
                    Drop files here!
                  </div>
                  <div>
                    <textarea
                      className="h-64 w-full border-neutral-800 bg-neutral-800 p-2"
                      placeholder="Descrição do NPC"
                      onChange={(e) =>
                        setNpc((parameters) => ({
                          ...parameters,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={disableButton}>
                    Criar NPC
                  </Button>
                </DialogFooter>
              </>
            )}
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={editModalForm} onOpenChange={setEditModalForm}>
        <DialogContent className=" text-white sm:max-w-[425px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();

              editNpc.mutate(selectNpc);
              setEditModalForm(false);
            }}
          >
            <DialogHeader>
              <DialogTitle>Edite esse NPC</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Input
                  id="name"
                  placeholder="Nome do NPC"
                  defaultValue={selectNpc.title}
                  className="col-span-3 border-neutral-800 bg-neutral-800"
                  onChange={(e) =>
                    setSelectNpc((parameters) => ({
                      ...parameters,
                      title: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <textarea
                  className="h-64 w-full border-neutral-800 bg-neutral-800 p-2"
                  placeholder="Descrição do NPC"
                  defaultValue={selectNpc.description}
                  onChange={(e) =>
                    setSelectNpc((parameters) => ({
                      ...parameters,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Salvar Mudanças</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
