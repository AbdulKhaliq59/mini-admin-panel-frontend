import * as protobuf from "protobufjs";

let cachedRoot: protobuf.Root | null = null;

export const loadProtoRoot = async () => {
    if (cachedRoot) return cachedRoot;

    cachedRoot = await protobuf.load("/users.proto");
    return cachedRoot;
}


export const decodeProtobuf = async (arrayBuffer: ArrayBuffer) => {
    const root = await loadProtoRoot();

    const UserList = root.lookupType("UserList");

    const decoded = UserList.decode(new Uint8Array(arrayBuffer));
    const object = UserList.toObject(decoded, {
        longs: String,
        enums: String,
        defaults: true,
    });

    return object as {
        users: any[]
    };
}