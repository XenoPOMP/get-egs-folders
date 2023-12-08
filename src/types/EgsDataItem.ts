import { Jsonish, Nullable, Primitive } from '@xenopomp/advanced-types';

type ValidKey = Nullable<Primitive>;

/**
 * Type of parsed EGS Data .item file.
 */
export type EgsDataItem = Jsonish<{
  FormatVersion: number;
  bIsIncompleteInstall: boolean;
  LaunchCommand: string;
  LaunchExecutable: string;
  ManifestLocation: string;
  ManifestHash: string;
  bIsApplication: boolean;
  bIsExecutable: boolean;
  bIsManaged: boolean;
  bNeedsValidation: string;
  bRequiresAuth: string;
  bAllowMultipleInstances: boolean;
  bCanRunOffline: boolean;
  bAllowUriCmdArgs: boolean;
  bLaunchElevated: boolean;
  BaseURLs: string[];
  BuildLabel: string;
  AppCategories: string[];
  ChunkDbs: ValidKey[];
  CompatibleApps: ValidKey[];
  DisplayName: string;
  InstallationGuid: string;
  InstallLocation: string;
  InstallSessionId: string;
  InstallTags: ValidKey[];
  InstallComponents: ValidKey[];
  HostInstallationGuid: string;
  PrereqIds: ValidKey[];
  PrereqSHA1Hash: string;
  LastPrereqSucceededSHA1Hash: string;
  StagingLocation: string;
  TechnicalType: string;
  VaultThumbnailUrl: string;
  VaultTitleText: string;
  InstallSize: number;
  MainWindowProcessName: string;
  ProcessNames: ValidKey[];
  BackgroundProcessNames: ValidKey[];
  IgnoredProcessNames: ValidKey[];
  DlcProcessNames: ValidKey[];
  MandatoryAppFolderName: string;
  OwnershipToken: boolean;
  CatalogNamespace: string;
  CatalogItemId: string;
  AppName: string;
  AppVersionString: string;
  MainGameCatalogNamespace: string;
  MainGameCatalogItemId: string;
  MainGameAppName: string;
  AllowedUriEnvVars: ValidKey[];
}>;
