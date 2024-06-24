"use client";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

import { Checkbox } from "../ui/checkbox";
import { useForm } from "react-hook-form";
import { fleekSdk } from "@/lib/fleek";
import { uploadFile } from "@/lib/web3storage";

type ActiveGuildType = {
  serverId: string;
  name: string;
  serverIcon: string | null;
  channelId: string | null;
  memberCount: number | null;
  active: boolean;
  createdAt: Date;
  description: string | null;
  tags: {
    id: string;
    name: string;
  }[];
};

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5).max(500),
  productUrl: z.string().url({ message: "Invalid url" }),
  channelId: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one Community.",
  }),

  image: z.instanceof(File).refine((file) => file.size <= 10 * 1024 * 1024, {
    message: "Image file size must be less than 10MB",
  }),
});

const PostForm = ({ activeGuilds }: { activeGuilds: ActiveGuildType[] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      productUrl: "",
      channelId: [],
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const upload = await uploadFile(values.image);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>Add the PRoduct title</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>Add the PRoduct Description</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="productUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormDescription>Add the PRoduct URL</FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="channelId"
            render={({ field }) => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Communities</FormLabel>
                  <FormDescription>
                    Select Communities you want to Launch/Share your product
                    with.
                  </FormDescription>
                </div>
                {activeGuilds?.map((guild) => (
                  <FormField
                    key={guild.channelId}
                    control={form.control}
                    name="channelId"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={guild.channelId}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(
                                guild.channelId || ""
                              )}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...field.value,
                                      guild.channelId,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== guild.channelId
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal gap-4 flex flex-col">
                            <span>{guild.name}</span>
                            <span>({guild.memberCount} members)</span>
                            <span>
                              {guild?.tags?.map((tag, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 cursor-pointer"
                                >
                                  {tag.name}
                                </span>
                              ))}
                            </span>
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        field.onChange(file);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>Upload an image</FormDescription>
                <FormMessage>
                  {form.formState.errors.image?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default PostForm;
